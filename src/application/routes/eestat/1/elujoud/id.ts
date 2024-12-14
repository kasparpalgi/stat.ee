import { Request, Response } from "express";
import { ApiResponse } from "./response";

import { randomUUID } from "crypto";
import { JsonNormalizationProvider } from '../../../../../infrastructure/norm_data_provider';
import { ModelService } from '../../../../model_service';
import { PredictionService } from '../../../../prediction';
import { YearlyCluster } from '../../../../../infrastructure/models/year_cluster';
import { Company } from '../../../../../infrastructure/models/company';
import { MonthlyCluster } from '../../../../../infrastructure/models/monthly_cluster';
import { logRequestSuccess } from '../../../../logger';
import { handleErrors } from '../../../../utils/errors';


/**
 * Handles the prognosing for a given company, either by ID or JSON data.
 * @param req - Express request object containing either company ID in params or JSON data in body
 * @param res - Express response object
 * @returns A promise that resolves to a record containing the prediction and company details
 */
export default async function handleRequest(
  req: Request,
  res: Response
): Promise<any> {
  // Generate a correlation ID for the request
  const correlationID = randomUUID();

  try {
    const response = await handleJsonRequest(req.body, correlationID);
    logRequestSuccess(correlationID, response);
    res.status(200).json(response);
  } catch (error) {
    handleErrors(req, res, error, correlationID);
    return;
  }
}



function allFieldsAreNull(object: any): boolean {
  return Object.values(object).every(value => {
    if (typeof value === 'object' && value !== null) {
      return Object.values(value).every(v => v === null);
    }
    return value === null;
  });
}


export async function handleJsonRequest(json: any, correlationID: string): Promise<ApiResponse> {
  if (allFieldsAreNull(json)) {
    throw new Error("All fields are null");
  }
  // company.getLatestYear
  const id = json.aastased.jykood;
  if (id.length !== 8 || isNaN(parseInt(id))) {
    throw new Error("ID must be an 8-digit number");
  }
  const company = Company.deserialize(json.aastased);
  if (company.klaster === "muu") {
    throw new Error("Cluster is not valid");
  }

  // company.getYear
  const yearly = YearlyCluster.deserialize(json.aastased);


  // company.getMonthly
  const monthly = MonthlyCluster.deserialize(json.kuised);

  const normalization = new JsonNormalizationProvider(
    json.norm_kuu_kesk,
    json.norm_kuu_sds,
    json.norm_aasta_kesk,
    json.norm_aasta_sds
  );

  const modelService = new ModelService(normalization);
  const predictionService = new PredictionService(modelService);


  const prediction = await predictionService.predict(
    correlationID,
    company,
    yearly,
    monthly
  );

  return ApiResponse.buildSuccess(prediction, monthly, company);
}
