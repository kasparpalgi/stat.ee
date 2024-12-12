import { PredictionResponse } from '../../domain/prediction_response';
import { Company } from './company';
import { YearlyCluster } from './year_cluster';

export interface CompanyYearPediction {
  companyYear: CompanyYear;
  prediction: PredictionResponse;
}

export interface CompanyYear {
  company: Company;
  year: YearlyCluster;
}
