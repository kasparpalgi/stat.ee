import { Request, Response } from 'express';
import { ModelService } from '../../../../../application';
import { CompanyRepository, dbQuery, NormMonthlyRepository } from '../../../../../infrastructure';
import { logRequestError, logRequestSuccess } from '../../../../logger';
import { randomUUID } from 'crypto';
import { handleErrors } from '../../../../utils/errors';

/**
* Handles the prognosing for a given company ID.
* @param id - The ID of the company.
* @returns A promise that resolves to a record containing the prediction and the unchanged company details.
*/
export default async function handleCompanyId(req: Request, res: Response): Promise<any> {
    // Generate a correlation ID for the request.
    const correlationID = randomUUID();
    // Create instances of the repositories and the model service.
    const companyRepository = new CompanyRepository();
    const monthlyRepository = new NormMonthlyRepository();
    const modelService = new ModelService();
    
    try {
        const id = req.params.id as string;
        // Will throw an error if the ID is not an 8-digit number.
        // Will throw an error if the "klaster" is 'muu'.
        const company = await companyRepository.getCompanyCurrentStatus(id, correlationID);
        // Wiil throw an error if the yearly data is not found.
        const companyYear = await companyRepository.getCompanyYear(company, correlationID);
        // Will throw an error if the monthly data is not found.
        const monthly = await monthlyRepository.getMonthly(id, correlationID);
        
        const monthlyCluster = await modelService.resolveMonthly(monthly, correlationID);
        const yearlyCluster = await modelService.resolveYearly(companyYear, correlationID);
        const prediction = await modelService.predictionResponse(company, yearlyCluster, monthlyCluster, correlationID);
        const response = {
            // Cuurent Company Values (Unchanged)
            ...company,
            // Predictable Values
            ...yearlyCluster,
            // Prediction
            ...prediction
        };
        logRequestSuccess(correlationID, response);
        res.status(200).json(response);
        return;
    } catch (e) {
        logRequestError(correlationID, e.message);
        handleErrors(req, res, e, correlationID);
        return;
    }
}
