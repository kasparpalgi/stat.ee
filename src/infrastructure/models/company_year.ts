import { PredictionResponse } from '../../domain';
import { YearlyCluster } from './year_cluster';
import { Company } from './company';


export interface CompanyYearPediction {
    companyYear: CompanyYear;
    prediction: PredictionResponse;
}


export interface CompanyYear {
    company: Company;
    year: YearlyCluster;
    normSuffix?: '_uus' | '_vanna';
}