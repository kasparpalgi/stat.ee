import client from "./database/oracle-client";
import { convertKeysToLowerCase } from '../application/utils/converter';
import { debugLogError } from '../application/logger';
import { MonthlyCluster } from './models/monthly_cluster';
import { NormalisationRepository } from './norm_repository';

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

    // Query to get the latest monthly data for a company by ID
    const query = `
            SELECT *
                FROM "ELUJOULISUSEINDEKS"."KUISED"
                WHERE "kood" = :kood
            FETCH FIRST 1 ROWS ONLY
        `;
    try {
      const response = await client.queryOne(query, { kood: id }, correlationID);
      if (response === null || response === undefined) {
        // When monthly data does not exist, models 1:4 should still be able to produce an output
        return null;
      }
      return MonthlyCluster.deserialize(response);
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
      const response = await client.queryOne(query, { klaster }, correlationID);
      // Some of the keys are uppercase, so we need to convert them to lowercase
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
      const response = await client.queryOne(query, { klaster }, correlationID);
      // Some of the keys are uppercase, so we need to convert them to lowercase
      const formattedResponse = convertKeysToLowerCase(response);
      return MonthlyCluster.deserialize(formattedResponse);
    } catch (error) {
      debugLogError(error);
      throw Error("Monthly MEA not found");
    }
  }
}
