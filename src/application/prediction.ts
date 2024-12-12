import { CompanyYear } from '../infrastructure/models/company_year';
import { MonthlyCluster } from '../infrastructure/models/monthly_cluster';
import { PredictionResponse } from '../domain/prediction_response';
import { Company } from '../infrastructure/models/company';
import { ModelService } from './model_service';
import { computeNormSuffix } from '../infrastructure/company_year_repository';
import { YearlyCluster } from '../infrastructure/models/year_cluster';

export class PredictionService {
    constructor(
        private readonly modelService: ModelService
    ) { }

    async predict(
        correlationID: string,
        forecastCompany: Company,
        company: Company,
        yearly: YearlyCluster,
        monthly: MonthlyCluster,
    ): Promise<PredictionResponse> {
        const monthlyCluster = await this.modelService.resolveMonthly(
            monthly,
            correlationID
        );
        const normSuffix = computeNormSuffix({ aasta: company.aasta }, { aasta: forecastCompany.aasta });
        
        const yearlyCluster = await this.modelService.resolveYearly(
            company,
            yearly,
            normSuffix,
            correlationID
        );
        const prediction = await this.modelService.predictionResponse(
            company,
            yearlyCluster,
            monthlyCluster,
            correlationID
        );
        return prediction;
    }
}
