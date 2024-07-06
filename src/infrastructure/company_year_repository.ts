import { dbQuery } from "./database_client/query";
import { Company, YearlyCluster, CompanyYear } from "./models";
import { DataRepository } from "./repository";


export class CompanyRepository implements DataRepository<CompanyYear>{
    // x2_current_status = look at the land_percent values in x2 and select HETKESEISUDE_TUNNUSED from the row where:
    // a) land_percent >= 0.9.
    // b) if both rows have land_percent >= 0.9, select HETKESEISUDE_TUNNUSED from the row with the larger "year"
    async getCompanyCurrentStatus(id: string): Promise<Company> {
        const pg = `
            WITH Filtered AS (
                SELECT *
                FROM "elujoulisuseindeks"."aastased"
                WHERE "jykood" = "${id}"
                ORDER BY "aasta" DESC
                LIMIT 2
            )
            SELECT *
            FROM Filtered
            WHERE "maa_protsent" >= 0.9
            ORDER BY "aasta" DESC
            LIMIT 1;
        `
        const oracle = `
            WITH Filtered AS (
                SELECT *
                FROM elujoulisuseindeks.aastased
                WHERE jykood = '${id}'
                ORDER BY aasta DESC
                FETCH FIRST 2 ROWS ONLY
            )
            SELECT *
            FROM Filtered
            WHERE maa_protsent >= 0.9
            ORDER BY aasta DESC
            FETCH FIRST 1 ROW ONLY;
        `
        const response = await dbQuery(pg, oracle);
        const company = Company.deserialize(response);

        return company;
    }

    async getCompanyYear(id: string): Promise<CompanyYear> {
        const pg = `
            SELECT *
                FROM "elujoulisuseindeks"."aastased"
                WHERE "jykood" = "${id}"
                ORDER BY "aasta" DESC
            LIMIT 1;
        `;
        const oracle = `
        SELECT *
                FROM elujoulisuseindeks.aastased
                WHERE jykood = ${id}
                ORDER BY aasta DESC
        FETCH FIRST 1 ROWS ONLY
        `;
        const result = await dbQuery(pg, oracle);
        // x2_forecast = select the row with the highest year from x2 and from that row, select PROGNOOSITUNNUSED
        const companyForecast = Company.deserialize(result);
        const forecastYear = YearlyCluster.deserialize(result);
        // x2_current_status =  look at the land_percent values in x2 and select HETKESEISUDE_TUNNUSED from the row where:
        // a) land_percent >= 0.9.
        // b) if both rows have land_percent >= 0.9, select HETKESEISUDE_TUNNUSED from the row with the larger "year"
        const currentStatus = await new CompanyRepository().getCompanyCurrentStatus(id);
        // SELECTION OF NORMALIZATION TABLE:
        // if the year of the current status row == year of the forecast row, then select _OLD tables for normalization
        // if the year of the current status row < year of the forecast row, then select _NEW tables for normalization
        // else is unspecified => error
        let normSuffix;
        if (currentStatus.maa_protsent == companyForecast.maa_protsent) {
            normSuffix = '_vana';
        } else if (currentStatus.maa_protsent < companyForecast.maa_protsent) {
            normSuffix = '_uus';
        } else {
            throw new Error("No normalization table found.");
        }

        return {
            company: currentStatus,
            year: forecastYear,
            normSuffix: normSuffix
        }
    }

}