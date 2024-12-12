import { MonthlyCluster } from './models/monthly_cluster';
import { YearlyCluster } from './models/year_cluster';
import { NormalisationRepository } from './norm_repository';
/**
 * Interface for retrieving normalization data from either database or JSON
 */
export interface NormalizationDataProvider {
    getMonthlySds(klaster: string, correlationID: string): Promise<MonthlyCluster>;
    getMonthlyMea(klaster: string, correlationID: string): Promise<MonthlyCluster>;
    getYearlySds(klaster: string, normSuffix: string, correlationID: string): Promise<YearlyCluster>;
    getYearlyMea(klaster: string, normSuffix: string, correlationID: string): Promise<YearlyCluster>;
}

/**
 * Implementation of NormalizationDataProvider using repository pattern
 */
export class RepositoryNormalizationProvider implements NormalizationDataProvider {
    constructor(
        private readonly monthlyRepository: NormalisationRepository<MonthlyCluster>,
        private readonly yearlyRepository: NormalisationRepository<YearlyCluster>
    ) { }

    async getMonthlySds(klaster: string, correlationID: string): Promise<MonthlyCluster> {
        return this.monthlyRepository.getSds(klaster, '', correlationID);
    }

    async getMonthlyMea(klaster: string, correlationID: string): Promise<MonthlyCluster> {
        return this.monthlyRepository.getMea(klaster, '', correlationID);
    }

    async getYearlySds(
        klaster: string,
        normSuffix: string,
        correlationID: string
    ): Promise<YearlyCluster> {
        return this.yearlyRepository.getSds(klaster, normSuffix, correlationID);
    }

    async getYearlyMea(
        klaster: string,
        normSuffix: string,
        correlationID: string
    ): Promise<YearlyCluster> {
        return this.yearlyRepository.getMea(klaster, normSuffix, correlationID);
    }
}

/**
 * Implementation of NormalizationDataProvider using JSON data
 */
export class JsonNormalizationProvider implements NormalizationDataProvider {
    constructor(
        private readonly monthlyMeaData: Record<string, any>,
        private readonly monthlySdsData: Record<string, any>,
        private readonly yearlyMeaData: Record<string, any>,
        private readonly yearlySdsData: Record<string, any>
    ) { }

    async getMonthlySds(): Promise<MonthlyCluster> {
        const data = this.monthlySdsData;
        if (!data) {
            throw new Error("Monthly SDS not found");
        }
        return MonthlyCluster.deserialize(data);
    }

    async getMonthlyMea(): Promise<MonthlyCluster> {
        const data = this.monthlyMeaData;
        if (!data) {
            throw new Error("Monthly MEA not found");
        }
        return MonthlyCluster.deserialize(data);
    }

    async getYearlySds(): Promise<YearlyCluster> {
        const data = this.yearlySdsData;
        if (!data) {
            throw new Error("Yearly SDS not found");
        }
        return YearlyCluster.deserialize(data);
    }

    async getYearlyMea(): Promise<YearlyCluster> {
        const data = this.yearlyMeaData;
        if (!data) {
            throw new Error("Yearly MEA not found");
        }
        return YearlyCluster.deserialize(data);
    }
}
