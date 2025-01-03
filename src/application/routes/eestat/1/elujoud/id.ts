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
 * @param req - Express request object containing JSON data in body
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




/**
 * Processes company data and returns predictions
 * 
 * @param json - Company data and statistics
 * @param correlationID - Request tracking ID
 */
export async function handleJsonRequest(json: any, correlationID: string): Promise<ApiResponse> {
  // Check for empty request
  if (allFieldsAreNull(json)) {
    throw new Error("All fields are null");
  }

  // Company data must have:
  // - An 8-digit registration code (kood)
  // - Occupancy rate (maa_protsent) >= 90%
  // - Valid cluster value (not "muu")
  const company = Company.deserialize(json.company);

  // Validate registration code format
  if (company.kood.length !== 8 || isNaN(parseInt(company.kood))) {
    throw new Error("ID must be an 8-digit number");
  }

  // Check if occupancy rate is at least 90%
  // if (company.maa_protsent < 0.9) {
  //   throw new Error("Occupancy rate must be at least 90%");
  // }

  // Check if cluster is valid
  if (company.klaster === "muu") {
    throw new Error("Cluster is not valid");
  }

  // Get company data for predictions
  const targetYear = Company.deserialize(json.lastYearCompany);
  const yearlyStats = YearlyCluster.deserialize(json.lastYearCompany);
  const monthlyStats = MonthlyCluster.deserialize(json.monthly);

  // Initialize statistics normalizer
  const statsNormalizer = new JsonNormalizationProvider(
    json.monthlyMea,  // Monthly means
    json.monthlySds,  // Monthly standard deviations
    json.yearlyMea,   // Yearly means
    json.yearlySds    // Yearly standard deviations
  );

  // Generate predictions
  const modelService = new ModelService(statsNormalizer);
  const predictionService = new PredictionService(modelService);
  const predictions = await predictionService.predict(
    correlationID,
    targetYear,
    yearlyStats,
    monthlyStats
  );


  return ApiResponse.success(predictions, monthlyStats, company);
}

function allFieldsAreNull(object: any): boolean {
  return Object.values(object).every(value => {
    if (typeof value === 'object' && value !== null) {
      return Object.values(value).every(v => v === null);
    }
    return value === null;
  });
}
