import client from "./database/oracle-client";
import { YearlyCluster } from './models/year_cluster';
import { NormalisationRepository } from './norm_repository';
import { debugLogError } from '../application/logger';

export class NormYearlyRepository
  implements NormalisationRepository<YearlyCluster> {
  async getSds(
    klaster: string,
    normSuffix: string,
    correlationID: string
  ): Promise<YearlyCluster | null> {
    const query = `
            SELECT *
                FROM "ELUJOULISUSEINDEKS"."NORM_AASTA_SDS${normSuffix}"
                WHERE "klaster" = :klaster
            FETCH FIRST 1 ROWS ONLY
        `;
    try {
      const response = await client.queryOne(query, { klaster }, correlationID);
      return YearlyCluster.deserialize(response);
    } catch (error) {
      debugLogError(error);
      throw Error("Yearly SDS not found");
    }
  }

  async getMea(
    klaster: string,
    normSuffix: string,
    correlationID: string
  ): Promise<YearlyCluster | null> {
    const query = `
            SELECT *
                FROM "ELUJOULISUSEINDEKS"."NORM_AASTA_KESK${normSuffix}"
                WHERE "klaster" = :klaster
            FETCH FIRST 1 ROWS ONLY
        `;
    try {
      const response = await client.queryOne(query, { klaster }, correlationID);
      return YearlyCluster.deserialize(response);
    } catch (error) {
      debugLogError(error);
      throw Error("Yearly MEA not found");
    }
  }
}
