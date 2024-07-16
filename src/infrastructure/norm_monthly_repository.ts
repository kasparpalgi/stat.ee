import { dbQuery } from "./database/oracle";
import { MonthlyCluster } from "./models";
import { NormalisationRepository } from "./repository";
import { checkMissingProperties, convertKeysToLowerCase } from "./../application";
import { logQueryError, logQuerySuccess } from "../application";

export class NormMonthlyRepository implements NormalisationRepository<MonthlyCluster> {
    /**
     * Retrieves the monthly data for a given kood.
     * @param id - The company identifier identifier.
     * @returns A promise that resolves to the monthly cluster data.
     */
    async getMonthly(id: string, correlationID: string): Promise<MonthlyCluster> {
        const query = `
            SELECT *
                FROM "ELUJOULISUSEINDEKS"."KUISED"
                WHERE "kood" = ${id}
            FETCH FIRST 1 ROWS ONLY
        `;
        try {
            const response = await dbQuery(query);
            logQuerySuccess(correlationID, query, response);
            const res = MonthlyCluster.deserialize(response).clamp();
            checkMissingProperties(res, 3);
            return res;
        } catch (error) {
            logQueryError(correlationID, query, error);
            throw error;
        }

    }

    async getSds(klaster: string, correlationID: string): Promise<MonthlyCluster> {
        const query = `
            SELECT *
                FROM "ELUJOULISUSEINDEKS"."NORM_KUU_SDS"
                WHERE "klaster" = '${klaster}'
            FETCH FIRST 1 ROWS ONLY
        `
        try {
            const response = await dbQuery(query);
            logQuerySuccess(correlationID, query, response);
            const formattedResponse = convertKeysToLowerCase(response);
            return MonthlyCluster.deserialize(formattedResponse).clamp();
        } catch (error) {
            logQueryError(correlationID, query, error);
            throw error;
        }
    }

    async getMea(klaster: string, correlationID: string): Promise<MonthlyCluster> {
        const query = `
            SELECT *
                FROM "ELUJOULISUSEINDEKS"."NORM_KUU_KESK"
                WHERE "klaster" = '${klaster}'
            FETCH FIRST 1 ROWS ONLY
            `;
        try {
            const response = await dbQuery(query);
            logQuerySuccess(correlationID, query, response);
            const formattedResponse = convertKeysToLowerCase(response);
            return MonthlyCluster.deserialize(formattedResponse).clamp();
        } catch (error) {
            logQueryError(correlationID, query, error);
            throw error;
        }
    }
}
