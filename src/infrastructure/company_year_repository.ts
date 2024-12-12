import client from "./database/oracle-client";
import { Company } from './models/company';
import { debugLogError } from '../application/logger';
import { CompanyYear } from './models/company_year';
import { YearlyCluster } from './models/year_cluster';

export class CompanyRepository {
  /**
   * @param id - The company identifier.
   * @returns A promise that resolves to the latest year of a comapnay
   * @throws {Error('Cluster is not valid')} - If the cluster is 'muu'.
   **/
  async getLastYearFiltered(id: string, correlationID: string): Promise<Record<string, any>> {
    // Gets latest yearly data for company by ID and filters out companies with less than 90% of the data
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
        `;

    const response = await client.queryOne(query, { jykood: id }, correlationID);

    return response;
  }

  async getLastYear(id: string,correlationID: string): Promise<Record<string, any>> {
    // Gets latest yearly data for company by ID
    const query = `
        SELECT *
        FROM "ELUJOULISUSEINDEKS"."AASTASED" 
        WHERE "jykood" = :jykood
        ORDER BY "aasta" DESC
        FETCH FIRST 1 ROWS ONLY
    `;
     const result = await client.queryOne(
        query,
       { jykood: id},
        correlationID
      );
    return result
  }
}


/**
 * Determines the normalization suffix based on the current company status and forecast year
 * @param company Current company status with year
 * @param forecastCompany Company forecast with year
 * @returns Normalization suffix "_UUS" or "_VANA"
 */
export function computeNormSuffix(
  company: { aasta: number },
  forecastCompany: { aasta: number }
): "_UUS" | "_VANA" {
  if (company.aasta === forecastCompany.aasta) {
    return "_VANA";
  } else if (company.aasta < forecastCompany.aasta) {
    return "_UUS";
  } else {
    throw new Error("Unable to choose normSuffix");
  }
}
