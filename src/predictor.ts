import CompanyData from "./entities/company_entity";
import { findMeaByCluster } from "./data_sources/mea_static_data";
import { findSdsByCluster } from "./data_sources/sds_static_data";
import { fakeFindById, findById } from "./data_sources/company_static_data";
import * as tf from "@tensorflow/tfjs";
import { Indicator } from "./enums/indicator_enum";
import ClusterEntity from "./entities/cluster_entity";
import PredictionEntity from "./entities/response_entity";
import { Request, Response } from "express";
import { sendError } from "./utils/errors";
import {  Prediction } from "./utils/interfaces";
import { port } from "./app";

import getGrowthData from "./data_sources/growth_static_data";
import { logger } from "./utils/logger";
export default class ModelRunner {
  public async handleRequest(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id as string);
      let prediction = await this.response(id);
      const response = prediction.serialize();
      // For 200 OK responses, the body should directly include the actual data as defined by Palgastatistka.
      res.send({response});
    } catch (error) {
      switch (error.message) {
        case 'Insufficient data':
          return sendError(res, "insufficient-data");
        case "Company not found":
          return sendError(res, "company-not-found");
        case "Cluster not found":
          return sendError(res, "cluster-not-found");
        default:
          logger.debug(error);
          return sendError(res, "bad-request");
      }
    } 
  }

  private prepareData(company: CompanyData): Array<number> {
    const clusterName = company.Klaster;

    // Retrieves the cluster values for the company.
    const companyCluster = ClusterEntity.fromCompany(company);

    // Subtracts the corresponding `mea` value from each retrieved field based on the cluster.
    const meaCluster = findMeaByCluster(clusterName);
    const substractedData = meaCluster.substract(companyCluster);

    // Divides each field by the corresponding `sds` value based on the cluster.
    const sdsCluster = findSdsByCluster(clusterName);
    const dividedData = sdsCluster.divide(substractedData);

    return Object.values(dividedData);
  }



  // Note: LoadLayersModel is only loading the model from a url, not from a local file
  private async loadModel(
    cluster: string,
    model: Indicator
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

 

  private async response(registCo: number): Promise<PredictionEntity> {
    // TODO: Change this with findById when the query is implemented
    let company = await fakeFindById(registCo);

    const response = new PredictionEntity();

    response.registCo = registCo;
    const liquidity = await this.predict(company, Indicator.Liquidity);
    response.model1y1 = liquidity.x;
    response.model1y2 = liquidity.y;
    response.model1y3 = liquidity.z;
    const profitability = await this.predict(company, Indicator.Profitability);
    response.model2y1 = profitability.x;
    response.model2y2 = profitability.y;
    response.model2y3 = profitability.z;
    const efficiency = await this.predict(company, Indicator.Efficiency);
    response.model3y1 = efficiency.x;
    response.model3y2 = efficiency.y;
    response.model3y3 = efficiency.z;
    const structure = await this.predict(company, Indicator.Structure);
    response.model4y1 = structure.x;
    response.model4y2 = structure.y;
    response.model4y3 = structure.z;
    const growth = await this.predict(company, Indicator.Growth);
    response.model5y1 = growth.x;
    response.model5y2 = growth.y;
    response.model5y3 = growth.z;
    // TODO: Implement sektorNo
    response.sektorNo = 0;

    try {
      const size = this.parseString(company.Ettevotte_suurusklass);
      response.size_min = size.min;
      response.size_max = size.max;
    } catch (error) {
      response.size_min = 0;
      response.size_max = 0;
    }

    response.county = company.Maakond;
    response.kov = company.KOV;

    response.LVKK = company.LVKK;
    response.MVK = company.MVK;
    response.RK = company.RK;
    response.LLLK = company.LLLK;
    response.LLVK = company.LLVK;
    response.LLOK = company.LLOK;
    response.VaKK = company.VaKK;
    response.LVKaK = company.LVKaK;
    response.VKK = company.VKK;
    response.VK = company.VK;
    response.KOS = company.KOS;
    response.LKKKK = company.LKKKK;
    response.PKKKK = company.PKKKK;
    response.AKM = company.AKM;
    response.PKM = company.PKM;
    response.ROA = company.ROA;
    response.ROE = company.ROE;

    // Eff
    response.EffpSect = company.sektor_efektiivsus_protsentiil;
    response.Eff_n_Sect = 0;
    response.EffpSize = company.suurusklass_efektiivsus_protsentiil;
    response.Eff_n_Size = 0;
    response.EffpCount = company.maakond_efektiivsus_protsentiil;
    response.Eff_n_Count = 0;
    // Liq
    response.LiqpSect = company.sektor_likviidsus_n;
    response.Liq_n_Sect = 0;
    response.LiqpSize = company.suurusklass_likviidsus_n;
    response.Liq_n_Size = 0;
    response.LiqpCount = company.maakond_likviidsus_protsentiil;
    response.Liq_n_Count = 0;
    // Lev
    response.LevpCount = company.sektor_struktuur_protsentiil;
    response.Lev_n_Count = 0;
    response.LevpSize = company.suurusklass_struktuur_protsentiil;
    response.Lev_n_Size = 0;
    response.LevpSect = company.maakond_struktuur_protsentiil;
    response.Lev_n_Sect = 0;
    // Ret
    response.RetpCount = company.sektor_tasuvus_protsentiil;
    response.Ret_n_Count = 0;
    response.RetpSize = company.suurusklass_tasuvus_protsentiil;
    response.Ret_n_Size = 0;
    response.RetpSect = company.maakond_tasuvus_protsentiil;
    response.Ret_n_Sect = 0;
    // Emp
    response.EmppCount = company.Tooviljakuse_kasv;
    response.Emp_n_Count = 0;
    response.EmppSize = company.suurusklass_efektiivsus_protsentiil;
    response.Emp_n_Size = 0;
    response.EmppSect = company.maakond_efektiivsus_protsentiil;
    response.Emp_n_Sect = 0;

    return response;
  }

  private parseString(str: string): { min: number; max: number } {
    const parts = str.split("_");
    // Check if there are at least 3 parts (minimum for 1, value, and 9)
    if (parts.length < 3) {
      throw new Error(
        "Invalid format: String must have at least three parts separated by underscores"
      );
    }
    const min = parseInt(parts[1]);
    const max = parseInt(parts[parts.length - 1]); // Access last element

    if (isNaN(min) || isNaN(max)) {
      throw new Error("Invalid format: Both values must be numbers");
    }
    return { min, max };
  }

  private async predictGrowth(company: CompanyData): Promise<Prediction> {
    // Load the pre-trained model layer for the specified cluster and indicator.
    const layer = await this.loadModel(company.Klaster, Indicator.Growth);
    // Fetch the growth data required for prediction.
    const flatArray = getGrowthData();
    // logger.debug("numbers", flatArray);
    // Create a tensor from the flattened array.
    const x = tf.tensor(flatArray, [36]);
    // Reshape the tensor to the required shape [1, 12, 3].
    const reshapedX = x.reshape([1, 3, 12]);

    // tf.print(reshapedX, true);
    // logger.debug("transformed", reshapedX);
    // Transpose the tensor to match the expected shape [null, 12, 3].
    const transposedX = reshapedX.transpose([0, 2, 1]);

    // tf.print(transposedX, true);
    // logger.debug("transposed", transposedX);
    // Make a prediction using the model layer and the transposed tensor.
    const prediction = await layer.predict(transposedX);
    // Synchronize the prediction data to a typed array.
    const dataSync = (prediction as tf.Tensor).dataSync();
   
    // Return the prediction results as an object with x, y, and z values.
    // console.log("result", dataSync);

    // Dispose of the tensors to free up memory.
    x.dispose()
    reshapedX.dispose()
    transposedX.dispose()
    tf.disposeVariables();
    (prediction as tf.Tensor).dispose();
    // Print the memory usage to the console.
    console.log('memory', tf.memory());
    return {
      x: dataSync[0],
      y: dataSync[1],
      z: dataSync[2],
    };
  }

  private async predict(
    companyData: CompanyData,
    indicator: Indicator
  ): Promise<Prediction> {
    if (indicator === Indicator.Growth) {
      return this.predictGrowth(companyData);
    }

    const data = this.prepareData(companyData);
    const tensor = await tf.tensor2d(data, [1, 64]);
    const loadedModel = await this.loadModel(companyData.Klaster, indicator);

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
