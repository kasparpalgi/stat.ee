import { logQueryError, logQuerySuccess } from "../application";
import { dbQuery } from "./database/oracle";
import { Company, YearlyCluster, CompanyYear } from "./models";
import { DataRepository } from "./repository";


export class CompanyRepository implements DataRepository<CompanyYear> {
    // x2_current_status = look at the land_percent values in x2 and select HETKESEISUDE_TUNNUSED from the row where:
    // a) land_percent >= 0.9.
    // b) if both rows have land_percent >= 0.9, select HETKESEISUDE_TUNNUSED from the row with the larger "year"
    async getCompanyCurrentStatus(id: string, correlationID: string): Promise<Company> {
        const query = `
            WITH Filtered AS (
                SELECT *
                FROM "ELUJOULISUSEINDEKS"."AASTASED"
                WHERE "jykood" = ${id}
                ORDER BY "aasta" DESC
                FETCH FIRST 2 ROWS ONLY
            )
            SELECT *
            FROM Filtered
            WHERE "maa_protsent" >= 0.9
            ORDER BY "aasta" DESC
            FETCH FIRST 1 ROW ONLY
        `
        try {
            const response = await dbQuery(query);
            logQuerySuccess(correlationID, query, response);
            return Company.deserialize(response);
        } catch (error) {
            logQueryError(correlationID, query, error);
            throw error;
        }
    }

    async getCompanyYear(id: string, correlationID: string): Promise<CompanyYear> {
        const query = `
        SELECT *
                FROM "ELUJOULISUSEINDEKS"."AASTASED"
                WHERE "jykood" = ${id}
                ORDER BY "aasta" DESC
        FETCH FIRST 1 ROWS ONLY
        `;
        try {
            const result = await dbQuery(query);
            logQuerySuccess(correlationID, query, result);
            const companyForecast = Company.deserialize(result);
            const forecastYear = YearlyCluster.deserialize(result);
            // This query will get logged internally.
            const currentStatus = await new CompanyRepository().getCompanyCurrentStatus(id, correlationID);

            const normSuffix = this.getNormalizationSuffix(currentStatus, companyForecast);

            return {
                company: currentStatus,
                year: forecastYear,
                normSuffix: normSuffix
            }
        } catch (error) {
            logQueryError(correlationID, query, error);
            throw error;
        }
    }

    // New function to determine the normalization suffix
    private getNormalizationSuffix(currentStatus: { aasta: number }, companyForecast: { aasta: number }): '_UUS' | '_VANA'{
        if (currentStatus.aasta === companyForecast.aasta) {
            return '_VANA';
        } else if (currentStatus.aasta < companyForecast.aasta) {
            return '_UUS';
        } else {
            throw new Error("No normalization table found.");
        }
    }

}

