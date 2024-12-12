import { Request, Response } from "express";
import { ApiResponse } from "./response";

import { randomUUID } from "crypto";
import { NormYearlyRepository } from '../../../../../infrastructure/norm_yearly_repository';
import { NormMonthlyRepository } from '../../../../../infrastructure/norm_monthly_repository';
import { CompanyRepository, computeNormSuffix } from '../../../../../infrastructure/company_year_repository';
import {  JsonNormalizationProvider } from '../../../../../infrastructure/norm_data_provider';
import { ModelService } from '../../../../model_service';
import { PredictionService } from '../../../../prediction';
import { YearlyCluster } from '../../../../../infrastructure/models/year_cluster';
import { Company } from '../../../../../infrastructure/models/company';
import { MonthlyCluster } from '../../../../../infrastructure/models/monthly_cluster';
import { logRequestSuccess } from '../../../../logger';
import { handleErrors } from '../../../../utils/errors';
import { env } from '../../../../../infrastructure/config/environment';


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

    const response = req.params.id
      ? await handleIdRequest(req.params.id, correlationID)
      : await handleJsonRequest(req.body, correlationID);

    logRequestSuccess(correlationID, response);
    res.status(200).json(response);
  } catch (error) {
    handleErrors(req, res, error, correlationID);
    return;
  }
}

function hasEnoughFields(object: any, maxNullValues: number = 3): boolean {
  return !(Object.values(object).filter(value => value === null || value === undefined).length > maxNullValues);
}


async function handleIdRequest(id: string, correlationID: string): Promise<ApiResponse> {
  if (env.canUseDatabase() === false) {
    throw new Error("This endpoint is not available in the current environment.");
  }

  const companyRepository = new CompanyRepository();

  const monthlyRepository = new NormMonthlyRepository();
  const yearlyRepository = new NormYearlyRepository();

  // last year filtered company
  const company = await companyRepository.getLastYearFiltered(id, correlationID);

  // last year company
  const lastYearCompany = await companyRepository.getLastYear(id, correlationID);

  // monthly
  const monthly = await monthlyRepository.getMonthly(id, correlationID);

  // norm suffix
  const normSuffix = computeNormSuffix({ aasta: company.aasta }, { aasta: lastYearCompany.aasta });

  // sds and mea
  const yearlySds = await yearlyRepository.getSds(company.klaster, normSuffix, correlationID);
  const yearlyMea = await yearlyRepository.getMea(company.klaster, normSuffix, correlationID);
  const monthlySds = await monthlyRepository.getSds(company.klaster, correlationID);
  const monthlyMea = await monthlyRepository.getMea(company.klaster, correlationID);

  const json = {
    company: company,
    lastYearCompany: lastYearCompany,
    monthly: monthly,
    yearlySds: yearlySds,
    yearlyMea: yearlyMea,
    monthlySds: monthlySds,
    monthlyMea: monthlyMea
  }

  return handleJsonRequest(json, correlationID);
}

async function handleJsonRequest(json: any, correlationID: string): Promise<ApiResponse> {

  // company.getLatestYear
  const id = json.company.jykood;
  if (id.length !== 8 || isNaN(parseInt(id))) {
    throw new Error("ID must be an 8-digit number");
  }
  const company = Company.deserialize(json.company);
  if (company.klaster === "muu") {
    throw new Error("Cluster is not valid");
  }

  // company.getYear
  const lastYearCompany = Company.deserialize(json.lastYearCompany);
  const yearly = YearlyCluster.deserialize(json.lastYearCompany);


  if (lastYearCompany.klaster === null || lastYearCompany.klaster === undefined) {
    throw new Error("Last year company data is not valid");
  }

  // if (!hasEnoughFields(yearly, 3)) {
  //   // Number of missing properties exceeds the limit of 3, the model cannot be used
  //   throw new Error("Yearly data is not valid");
  // }

  // company.getMonthly
  const monthly = MonthlyCluster.deserialize(json.monthly);
  if (!hasEnoughFields(monthly, 3)) {
    // Number of missing properties exceeds the limit of 3, the model cannot be used
    throw new Error("Monthly data is not valid");
  }


  const normalizationProvider = new JsonNormalizationProvider(
    json.monthlyMea,
    json.monthlySds,
    json.yearlyMea,
    json.yearlySds
  );

  const modelService = new ModelService(normalizationProvider);
  const predictionService = new PredictionService(modelService);


  const prediction = await predictionService.predict(
    correlationID,
    lastYearCompany,
    company,
    yearly,
    monthly
  );

  return ApiResponse.buildSuccess(prediction, monthly, company);
}
