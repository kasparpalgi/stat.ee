import { logQueryError, logQuerySuccess } from "../application";
import { dbQuery } from "./database/oracle";
import { YearlyCluster } from "./models";
import { NormalisationRepository as NormalisationRepository } from "./repository";


export class NormYearlyRepository implements NormalisationRepository<YearlyCluster> {
    async getSds(klaster: string, normSuffix: string, correlationID: string): Promise<YearlyCluster> {
        const query = `
            SELECT *
                FROM "ELUJOULISUSEINDEKS"."NORM_AASTA_SDS${normSuffix}"
                WHERE "klaster" = '${klaster}'
            FETCH FIRST 1 ROWS ONLY
        `;
        try {
            const response = await dbQuery(query);
            logQuerySuccess(correlationID, query, response);
            return YearlyCluster.deserialize(response).clamp();
        } catch (error) {
            logQueryError(correlationID, query, error);
            throw error;
        }
    }

    async getMea(klaster: string, normSuffix: string, correlationID: string): Promise<YearlyCluster> {
        const query = `
            SELECT *
                FROM "ELUJOULISUSEINDEKS"."NORM_AASTA_KESK${normSuffix}"
                WHERE "klaster" = '${klaster}'
            FETCH FIRST 1 ROWS ONLY
        `;
        try {
            const response = await dbQuery(query);
            logQuerySuccess(correlationID, query, response);
            return YearlyCluster.deserialize(response).clamp();
        } catch (error) {
            logQueryError(correlationID, query, error);
            throw error;
        }
    }
}