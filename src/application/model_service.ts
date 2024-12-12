import * as tf from "@tensorflow/tfjs-node";
import { NormalizationDataProvider } from '../infrastructure/norm_data_provider';
import { ModelIndicator } from '../domain/model_indicator';
import { debugLogError, logModelLoadError } from './logger';
import { CompanyYear } from '../infrastructure/models/company_year';
import { YearlyCluster, convertYearlyAsArray } from '../infrastructure/models/year_cluster';
import { MonthlyCluster, convertMonthlyAsArray } from '../infrastructure/models/monthly_cluster';
import { divideObjects, subtractObjects } from './utils/operations';
import { Company } from '../infrastructure/models/company';
import { Prediction } from '../domain/prediction';
import { PredictionResponse } from '../domain/prediction_response';



/**
 * Represents a service for working with yearly models.
 */
export class ModelService {
  constructor(private readonly dataProvider: NormalizationDataProvider) { }

  /**
   * Loads a TensorFlow Layers Model.
   * @param cluster - The cluster name.
   * @param model - The model indicator.
   * @returns A promise that resolves to a TensorFlow Layers Model.
   */
  async loadClusterModel(
    cluster: string,
    model: ModelIndicator
  ): Promise<tf.LayersModel> {
    try {
      const rootDir = process.cwd();
      const path = rootDir + "/models/" + model + "_" + cluster + "/model.json";
      const fileSystem = tf.io.fileSystem(path);
      if (!fileSystem) {
        throw new Error("Model does not exist in the specified path.");
      }
      // Load the model from the local file system.
      // The model is stored in the /models directory.
      return tf.loadLayersModel(fileSystem);
    } catch (error) {
      debugLogError(error);
      logModelLoadError(cluster, model, error.message);
      throw new Error("TensorFlow model could not be loaded.");
    }
  }

  async resolveYearly(
    company: Company,
    yearly: YearlyCluster,
    correlationID: string
  ): Promise<YearlyCluster> {
    // Clamp the company yearly predictable values
    const year = yearly;

    // Get the MEA values for the company klaster
    const mea = await this.dataProvider.getYearlyMea(
      company.klaster,
      correlationID
    );
    // Subtracts the corresponding `mea` value from each retrieved field based on the cluster.
    const meaSubstracted = subtractObjects(year, mea);
    // Get the SDS values for the company klaster
    const sds = await this.dataProvider.getYearlySds(
      company.klaster,
      correlationID
    );
    // Divides each field by the corresponding `sds` value based on the cluster.
    const sdsDivided = divideObjects(meaSubstracted, sds);
    return sdsDivided;
  }

  async resolveMonthly(
    cluster: MonthlyCluster | null,
    correlationID: string
  ): Promise<MonthlyCluster | null> {
    if (cluster === null) {
      return null;
    }
    // Subtracts the corresponding `mea` value from each retrieved field based on the cluster.
    const mea: MonthlyCluster = await this.dataProvider.getMonthlyMea(
      cluster.klaster,
      correlationID
    );
    const meaSubstracted: MonthlyCluster = subtractObjects(cluster, mea);
    // Divides each field by the corresponding `sds` value based on the cluster.
    const sds: MonthlyCluster = await this.dataProvider.getMonthlySds(
      cluster.klaster,
      correlationID
    );
    const sdsDivided: MonthlyCluster = divideObjects(meaSubstracted, sds);

    return sdsDivided;
  }

  async predictMonthlyGrowth(
    company: Company,
    monthly: MonthlyCluster,
    correlationID: string
  ): Promise<Prediction> {
    // Load the pre-trained model layer for the specified cluster and indicator.
    const layer = await this.loadClusterModel(
      company.klaster,
      ModelIndicator.Growth
    );
    // Fetch the required data for prediction.
    const resolvedMonthly: MonthlyCluster = await this.resolveMonthly(
      monthly,
      correlationID
    );

    const array = convertMonthlyAsArray(resolvedMonthly);
    // Create a tensor from the flattened array.
    const x = tf.tensor(array, [36]);
    // Reshape the tensor to the required shape [1, 12, 3].
    const reshapedX = x.reshape([1, 3, 12]);
    // Transpose the tensor to match the expected shape [null, 12, 3].
    const transposedX = reshapedX.transpose([0, 2, 1]);
    // Make a prediction using the model layer and the transposed tensor.
    // This has to be awaited
    const prediction = await layer.predict(transposedX);
    // Synchronize the prediction data to a typed array.
    const dataSync = (prediction as tf.Tensor).dataSync();
    // Dispose of the tensors to free up memory.
    x.dispose();
    reshapedX.dispose();
    transposedX.dispose();
    tf.disposeVariables();
    (prediction as tf.Tensor).dispose();
    // Return the prediction results as an object with x, y, and z values.
    return {
      low: dataSync[0],
      medium: dataSync[1],
      high: dataSync[2],
    };
  }

  async predictIndicator(
    company: Company,
    year: YearlyCluster,
    monthly: MonthlyCluster | null,
    indicator: ModelIndicator,
    correlationID: string
  ): Promise<Prediction> {
    if (indicator === ModelIndicator.Growth && monthly !== null) {
      return this.predictMonthlyGrowth(company, monthly, correlationID);
    }
    const array = convertYearlyAsArray(year);
    const tensor = await tf.tensor2d(array, [1, 64]);
    const loadedModel = await this.loadClusterModel(company.klaster, indicator);

    // This has to be awaited
    const prediction = await (loadedModel.predict(tensor) as tf.Tensor);
    const dataSync = prediction.dataSync();

    // Dispose of the tensors to free up memory.
    prediction.dispose();
    tensor.dispose();
    loadedModel.dispose();

    return {
      low: dataSync[0],
      medium: dataSync[1],
      high: dataSync[2],
    };
  }

  async predictionResponse(
    company: Company,
    year: YearlyCluster,
    monthly: MonthlyCluster | null,
    correlationID: string
  ): Promise<PredictionResponse> {
    const response = new PredictionResponse();

    const liquidity = await this.predictIndicator(
      company,
      year,
      monthly,
      ModelIndicator.Liquidity,
      correlationID
    );
    response.model1y1 = liquidity.low;
    response.model1y2 = liquidity.medium;
    response.model1y3 = liquidity.high;
    const profitability = await this.predictIndicator(
      company,
      year,
      monthly,
      ModelIndicator.Profitability,
      correlationID
    );
    response.model2y1 = profitability.low;
    response.model2y2 = profitability.medium;
    response.model2y3 = profitability.high;
    const efficiency = await this.predictIndicator(
      company,
      year,
      monthly,
      ModelIndicator.Efficiency,
      correlationID
    );
    response.model3y1 = efficiency.low;
    response.model3y2 = efficiency.medium;
    response.model3y3 = efficiency.high;
    const structure = await this.predictIndicator(
      company,
      year,
      monthly,
      ModelIndicator.Structure,
      correlationID
    );
    response.model4y1 = structure.low;
    response.model4y2 = structure.medium;
    response.model4y3 = structure.high;

    if (monthly !== null) {
      const growth = await this.predictIndicator(
        company,
        year,
        monthly,
        ModelIndicator.Growth,
        correlationID
      );
      response.model5y1 = growth.low;
      response.model5y2 = growth.medium;
      response.model5y3 = growth.high;
    }

    return response;
  }
}