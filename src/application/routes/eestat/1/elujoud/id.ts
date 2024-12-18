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
  // Check if data any data is present
  if (allFieldsAreNull(json)) {
    throw new Error("All fields are null");
  }

  // Check if company ID is valid
  const company = Company.deserialize(json.company);
  if (company.kood.length !== 8 || isNaN(parseInt(company.kood))) {
    throw new Error("ID must be an 8-digit number");
  }

  // Check if cluster is valid
  if (company.klaster === "muu") {
    throw new Error("Cluster is not valid");
  }


  // Data used for prediction
  const forecastCompany = Company.deserialize(json.lastYearCompany);
  const yearly = YearlyCluster.deserialize(json.lastYearCompany);
  const monthly = MonthlyCluster.deserialize(json.monthly);

  // Normalization data
  const normalization = new JsonNormalizationProvider(
    json.monthlyMea,
    json.monthlySds,
    json.yearlyMea,
    json.yearlySds
  );

  
  const modelService = new ModelService(normalization);
  const predictionService = new PredictionService(modelService);

  const prediction = await predictionService.predict(
    correlationID,
    forecastCompany,
    yearly,
    monthly
  );

  return ApiResponse.buildSuccess(prediction, monthly, company);
}
