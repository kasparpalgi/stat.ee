import { dbQuery } from "./database/oracle";
import { MonthlyCluster } from "./models";
import { NormalisationRepository } from "./repository";
import { convertKeysToLowerCase } from "./../application";
import { debugLogError } from "./../application/logger";

export class NormMonthlyRepository
  implements NormalisationRepository<MonthlyCluster> {
  /**
   * Retrieves the monthly data for a given kood.
   * @param id - The company identifier identifier.
   * @returns A promise that resolves to the monthly cluster data.
   *
   *
   * @throws {Error('Failed to retrieve monthly data')},§
   */
  async getMonthly(
    id: string,
    correlationID: string
  ): Promise<MonthlyCluster | null> {
    const query = `
            SELECT *
                FROM "ELUJOULISUSEINDEKS"."KUISED"
                WHERE "kood" = :kood
            FETCH FIRST 1 ROWS ONLY
        `;
    try {
      const response = await dbQuery(query, { kood: id }, correlationID);
      if (response === null || response === undefined) {
        // When monthly data does not exist, models 1:4 should still be able to produce an output
        return null;
      }
      const responseValues = Object.values(response);
      const undefinedFieldsLenght = responseValues.filter(
        (value) => value === null || value === undefined
      ).length;
      if (undefinedFieldsLenght > 3) {
        // Number of missing properties exceeds the limit of 3, the model cannot be used
        return null;
      }
      console.log(response.tor_m_min1, "query");
      const monthly = MonthlyCluster.deserialize(response);
      console.log(monthly.tor_m_min1, "deserialize");
      return monthly;
    } catch (error) {
      debugLogError(error);
      throw new Error("Failed to retrieve monthly data");
    }
  }

  async getSds(
    klaster: string,
    correlationID: string
  ): Promise<MonthlyCluster | null> {
    const query = `
            SELECT *
                FROM "ELUJOULISUSEINDEKS"."NORM_KUU_SDS"
                WHERE "klaster" = :klaster
            FETCH FIRST 1 ROWS ONLY
        `;
    try {
      const response = await dbQuery(query, { klaster }, correlationID);
      const formattedResponse = convertKeysToLowerCase(response);
      return MonthlyCluster.deserialize(formattedResponse);
    } catch (error) {
      debugLogError(error);
      throw Error("Monthly SDS not found");
    }
  }

  async getMea(
    klaster: string,
    correlationID: string
  ): Promise<MonthlyCluster> {
    const query = `
            SELECT *
                FROM "ELUJOULISUSEINDEKS"."NORM_KUU_KESK"
                WHERE "klaster" = :klaster
            FETCH FIRST 1 ROWS ONLY
            `;
    try {
      const response = await dbQuery(query, { klaster }, correlationID);
      const formattedResponse = convertKeysToLowerCase(response);
      return MonthlyCluster.deserialize(formattedResponse);
    } catch (error) {
      debugLogError(error);
      throw Error("Monthly MEA not found");
    }
  }
}
