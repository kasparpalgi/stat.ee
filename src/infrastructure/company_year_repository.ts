import { dbQuery } from "./database/oracle";
import { Company, YearlyCluster, CompanyYear } from "./models";


export class CompanyRepository  {
    /** 
    * @param id - The company identifier.
    * @returns A promise that resolves to the latest year of a comapnay
    * @throws {Error('Cluster is not valid')} - If the cluster is 'muu'.
    **/
    async getLatestYear(id: string, correlationID: string): Promise<Company> {
        const query = `
            WITH Filtered AS (
                SELECT *
                FROM "ELUJOULISUSEINDEKS"."AASTASED"
                WHERE "jykood" = :jykood
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
            if (id.length !== 8 || isNaN(parseInt(id))) {
                throw new Error("ID must be an 8-digit number");
            }
            const response = await dbQuery(query, { jykood: id }, correlationID);
            const company = Company.deserialize(response);
            if (company.klaster === 'muu') {
                throw new Error("Cluster is not valid");
            }
            return Company.deserialize(response);
        } catch (error) {
            console.log(error);
            switch (error.message) {
                case "ID must be an 8-digit number":
                    throw new Error("ID must be an 8-digit number");
                case "Cluster is not valid":
                    throw new Error("Cluster is not valid");
                default:
                    throw new Error("ID not found");
            }
        }
    }

    async getYear(company: Company, correlationID: string): Promise<CompanyYear> {
        const query = `
        SELECT *
                FROM "ELUJOULISUSEINDEKS"."AASTASED"
                WHERE "jykood" = :jykood
                ORDER BY "aasta" DESC
        FETCH FIRST 1 ROWS ONLY
        `;
        try {
            const result = await dbQuery(query, { jykood: company.jykood },correlationID);
            const yearNumber = result.aasta;
            const forecastCompany = Company.deserialize(result);
            const forecastYear = YearlyCluster.deserialize(result);
            if (forecastCompany === null || forecastYear === null) {
                throw new Error("Yearly data not found");
            }
            const normSuffix = this.computeNormSuffix(company, forecastCompany);
            return {
                company: company,
                year: forecastYear,
                normSuffix: normSuffix,
                yearNumber: yearNumber,
            }
        } catch (error) {
            switch (error.message) {
                case "Yearly data not found":
                    throw new Error("Yearly data not found");
                default:
                    throw new Error("ID not found");
            }
        }
    }

    // New function to determine the normalization suffix
    private computeNormSuffix(currentStatus: { aasta: number }, companyForecast: { aasta: number }): '_UUS' | '_VANA' {
        if (currentStatus.aasta === companyForecast.aasta) {
            return '_VANA';
        } else if (currentStatus.aasta < companyForecast.aasta) {
            return '_UUS';
        } else {
            throw new Error("Unable to choose normSuffix");
        }
    }
}

