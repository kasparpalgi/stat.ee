import * as tf from "@tensorflow/tfjs-node";
import { ModelIndicator } from "../domain/model_indicator";
import { PredictionResponse } from "../domain";
import { Prediction } from "../domain";
import { port } from "../app";

import { NormYearlyRepository, NormMonthlyRepository, Company, CompanyYear, YearlyCluster, MonthlyCluster } from "../infrastructure";

/**
 * Represents a service for working with yearly models.
 */
export class ModelService {
  private readonly yearlyRepository: NormYearlyRepository;
  private readonly monthlyRepository: NormMonthlyRepository;

  constructor() {
    this.yearlyRepository = new NormYearlyRepository();
    this.monthlyRepository = new NormMonthlyRepository();
  }

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
    return tf.loadLayersModel(
      `http://localhost:${port}` +
      "/static/" +
      model +
      "_" +
      cluster +
      "/model.json"
    );
  }


 
  async resolveYearly(companyYear: CompanyYear, correlationID: string): Promise<YearlyCluster>{
    // Clamp the company yearly predictable values
    const year = companyYear.year.clamp();

    // Get the MEA values for the company klaster
    const mea = await this.yearlyRepository.getMea(companyYear.company.klaster, companyYear.normSuffix, correlationID);
    // Subtracts the corresponding `mea` value from each retrieved field based on the cluster.
    const meaSubstracted = year.substract(mea);
    // Get the SDS values for the company klaster
    const sds = await this.yearlyRepository.getSds(companyYear.company.klaster, companyYear.normSuffix, correlationID);
    // Divides each field by the corresponding `sds` value based on the cluster.
    const sdsDivided = meaSubstracted.divide(sds);
    return sdsDivided;
  }

  
  async resolveMonthly(cluster: MonthlyCluster, correlationID: string): Promise<MonthlyCluster> {
    // Subtracts the corresponding `mea` value from each retrieved field based on the cluster.
    const mea = await this.monthlyRepository.getMea(cluster.klaster, correlationID);
    const meaSubstracted = cluster.substract(mea);
    // Divides each field by the corresponding `sds` value based on the cluster.
    const sds = await this.monthlyRepository.getSds(cluster.klaster, correlationID);
    const sdsDivided = meaSubstracted.divide(sds);

    return sdsDivided;
  }

  async predictMonthlyGrowth(company: Company, monthly: MonthlyCluster, correlationID: string): Promise<Prediction> {
    // Load the pre-trained model layer for the specified cluster and indicator.
    const layer = await this.loadClusterModel(company.klaster, ModelIndicator.Growth);
    // Fetch the required data for prediction.
    const resolvedMonthly = await this.resolveMonthly(monthly, correlationID);
    // Create a tensor from the flattened array.
    const x = tf.tensor(resolvedMonthly.asArray(), [36]);
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
    x.dispose()
    reshapedX.dispose()
    transposedX.dispose()
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
    monthly: MonthlyCluster,
    indicator: ModelIndicator,
    correlationID: string
  ): Promise<Prediction> {
    if (indicator === ModelIndicator.Growth) {
      return this.predictMonthlyGrowth(company, monthly, correlationID);
    }
    const data = year.toArray();
    const tensor = await tf.tensor2d(data, [1, 64]);
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

  async predictionResponse(company: Company, year: YearlyCluster, monthly: MonthlyCluster,
 correlationID: string): Promise<PredictionResponse> {
    const response = new PredictionResponse();
    
    const liquidity = await this.predictIndicator(company, year, monthly, ModelIndicator.Liquidity, correlationID,);
    response.model1y1 = liquidity.low;
    response.model1y2 = liquidity.medium;
    response.model1y3 = liquidity.high;
    const profitability = await this.predictIndicator(company, year, monthly, ModelIndicator.Profitability, correlationID);
    response.model2y1 = profitability.low;
    response.model2y2 = profitability.medium;
    response.model2y3 = profitability.high;
    const efficiency = await this.predictIndicator(company, year, monthly, ModelIndicator.Efficiency, correlationID);
    response.model3y1 = efficiency.low;
    response.model3y2 = efficiency.medium;
    response.model3y3 = efficiency.high;
    const structure = await this.predictIndicator(company, year, monthly, ModelIndicator.Structure, correlationID);
    response.model4y1 = structure.low;
    response.model4y2 = structure.medium;
    response.model4y3 = structure.high;
    const growth = await this.predictIndicator(company, year, monthly, ModelIndicator.Growth, correlationID);
    response.model5y1 = growth.low;
    response.model5y2 = growth.medium;
    response.model5y3 = growth.high;

    return response;
  }

}



