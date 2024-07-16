import { Request, Response } from 'express';
import { sendError } from '../../../../utils';
import { ModelService } from '../../../../../application';
import { CompanyRepository } from '../../../../../infrastructure';

/**
* Handles the prognosing for a given company ID.
* @param id - The ID of the company.
* @returns A promise that resolves to a record containing the prediction and the unchanged company details.
*/
export default async function handleCompanyId(req: Request, res: Response): Promise<any> {
    try {
        const id = req.params.id as string;
        const companyYear = await new CompanyRepository().getCompanyYear(id);
        const company = companyYear.company;
        const year = await new ModelService().resolveYearly(companyYear);
        const prediction = await new ModelService().predictionResponse(company,year);

        res.json({
            // Cuurent Company Values (Unchanged)
            ...company,
            // Predictable Values
            ...year,
            // Prediction
            ...prediction
        });
        
    } catch (error) {
        console.log(error);
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
    }
}