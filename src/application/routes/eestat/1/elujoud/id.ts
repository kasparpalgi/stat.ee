import { Request, Response } from 'express';
import { sendError } from '../../../../utils';
import { ModelService } from '../../../../../application';
import { CompanyRepository } from '../../../../../infrastructure';
import { logRequest, logRequestError, logRequestSuccess } from '../../../../logger';
import { randomUUID } from 'crypto';

/**
* Handles the prognosing for a given company ID.
* @param id - The ID of the company.
* @returns A promise that resolves to a record containing the prediction and the unchanged company details.
*/
export default async function handleCompanyId(req: Request, res: Response): Promise<any> {
    const correlationID = randomUUID();
    try {
        const id = req.params.id as string;
        const companyYear = await new CompanyRepository().getCompanyYear(id, correlationID);
        const company = companyYear.company;
        const year = await new ModelService().resolveYearly(companyYear, correlationID);
        const prediction = await new ModelService().predictionResponse(company,year,correlationID);
        const response = {
            // Cuurent Company Values (Unchanged)
            ...company,
            // Predictable Values
            ...year,
            // Prediction
            ...prediction
        };
        // Log the request
        logRequestSuccess(correlationID, response);
        // Return the response
        res.json(response);
    } catch (error) {
        logRequestError(correlationID, error.message);
        switch (error.message) {
            case 'Insufficient data':
                return sendError(res, "insufficient-data");
            case "Company not found":
                return sendError(res, "company-not-found");
            case "Cluster not found":
                return sendError(res, "cluster-not-found");
            default:
                return sendError(res, "bad-request");
        }
    } finally {
        
    }
}