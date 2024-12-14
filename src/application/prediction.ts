import { MonthlyCluster } from '../infrastructure/models/monthly_cluster';
import { PredictionResponse } from '../domain/prediction_response';
import { Company } from '../infrastructure/models/company';
import { ModelService } from './model_service';
import { YearlyCluster } from '../infrastructure/models/year_cluster';

export class PredictionService {
    constructor(
        private readonly modelService: ModelService
    ) { }

    async predict(
        correlationID: string,
        company: Company,
        yearly: YearlyCluster,
        monthly: MonthlyCluster | null,
    ): Promise<PredictionResponse | null> {
       
        const monthlyCluster = await this.modelService.resolveMonthly(
            monthly,
            correlationID
        );
        
        const yearlyCluster = await this.modelService.resolveYearly(
            company,
            yearly,
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
