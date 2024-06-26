import * as tf from "@tensorflow/tfjs-node";
import { ModelIndicator } from "../domain/model_indicator";
import { PredictionResponse } from "../domain";
import { Prediction } from "../domain";
import { port } from "../app";

import { Yearly, Repository, YearlyCluster } from "../infrastructure";



/**
 * Represents a service for working with models.
 */
export class ModelService {
  private readonly repository: Repository;

  constructor() {
    this.repository = new Repository();
  }

    // Note: LoadLayersModel is only loading the model from a url, not from a local file
   async  loadModel(
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


  async applyMeaAndSds(yearly: Yearly): Promise<YearlyCluster> {
    // Retrieves the cluster values for the company.
    const cluster = yearly.toCluster();

    const clusterName = yearly.klaster;
    // Subtracts the corresponding `mea` value from each retrieved field based on the cluster.
    const mea = await this.repository.getMea(clusterName);
    const substractedMea = cluster.substract(mea);

    // Divides each field by the corresponding `sds` value based on the cluster.
    const sds = await this.repository.getSds(clusterName);
    const dividedData = substractedMea.divide(sds);

    return dividedData;
  }

  async predictJykood(jykood: number, landPercent?: number | undefined): Promise<any>{
    const yearly = await this.repository.getJykood(jykood, landPercent);
    let prediction = await this.response(yearly);
    // For 200 OK responses, the body should directly include the actual data as defined by Palgastatistka.
    const response = {
      ...prediction.serialize(),
      ...yearly.serialize()
    };

    return response;
  }


  /**
   * Retrieves the prediction response for the given yearly data.
   * @param yearly - The yearly data.
   * @returns A promise that resolves to the prediction response.
   */
  async response(yearly: Yearly): Promise<PredictionResponse> {
    const response = new PredictionResponse();

    const liquidity = await this.predictIndicator(yearly, ModelIndicator.Liquidity);
    response.model1y1 = liquidity.x;
    response.model1y2 = liquidity.y;
    response.model1y3 = liquidity.z;
    const profitability = await this.predictIndicator(yearly, ModelIndicator.Profitability);
    response.model2y1 = profitability.x;
    response.model2y2 = profitability.y;
    response.model2y3 = profitability.z;
    const efficiency = await this.predictIndicator(yearly, ModelIndicator.Efficiency);
    response.model3y1 = efficiency.x;
    response.model3y2 = efficiency.y;
    response.model3y3 = efficiency.z;
    const structure = await this.predictIndicator(yearly, ModelIndicator.Structure);
    response.model4y1 = structure.x;
    response.model4y2 = structure.y;
    response.model4y3 = structure.z;
    const growth = await this.predictIndicator(yearly, ModelIndicator.Growth);
    response.model5y1 = growth.x;
    response.model5y2 = growth.y;
    response.model5y3 = growth.z;

    return response;
  }


  async  predictGrowthIndicator(yearly: Yearly): Promise<Prediction> {
    // Load the pre-trained model layer for the specified cluster and indicator.
    const layer = await this.loadModel(yearly.klaster, ModelIndicator.Growth);
    // Fetch the growth data required for prediction.
    const monthly = await this.repository.getMonthly(yearly.klaster);
    const monthlyArray = monthly.asArray();
    // Create a tensor from the flattened array.
    const x = tf.tensor(monthlyArray, [36]);
    // Reshape the tensor to the required shape [1, 12, 3].
    const reshapedX = x.reshape([1, 3, 12]);
    // Transpose the tensor to match the expected shape [null, 12, 3].
    const transposedX = reshapedX.transpose([0, 2, 1]);
    // Make a prediction using the model layer and the transposed tensor.
    const prediction = await layer.predict(transposedX);
    // Synchronize the prediction data to a typed array.
    const dataSync = (prediction as tf.Tensor).dataSync();
    // Dispose of the tensors to free up memory.
    x.dispose()
    reshapedX.dispose()
    transposedX.dispose()
    tf.disposeVariables();
    (prediction as tf.Tensor).dispose();
    // Print the memory usage to the console.
    console.log('debug', tf.memory());
    // Return the prediction results as an object with x, y, and z values.
    return {
      x: dataSync[0],
      y: dataSync[1],
      z: dataSync[2],
    };
  }

  async predictIndicator(
    yearly: Yearly,
    indicator: ModelIndicator
  ): Promise<Prediction> {
    if (indicator === ModelIndicator.Growth) {
      return this.predictGrowthIndicator(yearly);
    
    }

    const data = await this.applyMeaAndSds(yearly);
    const dataArray = data.toArray();
    const tensor = await tf.tensor2d(dataArray, [1, 64]);
    const loadedModel = await this.loadModel(yearly.klaster, indicator);

    // This has to be awaited
    const prediction = await (loadedModel.predict(tensor) as tf.Tensor);
    const dataSync = prediction.dataSync();

    // Dispose of the tensors to free up memory.
    prediction.dispose();
    tensor.dispose();
    loadedModel.dispose();

    return {
      x: dataSync[0],
      y: dataSync[1],
      z: dataSync[2],
    };
  }
}
