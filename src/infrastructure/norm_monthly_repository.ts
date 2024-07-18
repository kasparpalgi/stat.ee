import { dbQuery } from "./database/oracle";
import { MonthlyCluster } from "./models";
import { NormalisationRepository } from "./repository";
import { checkExists, checkMissingProperties, convertKeysToLowerCase } from "./../application";
import { logQueryError, logQuerySuccess } from "../application";

export class NormMonthlyRepository implements NormalisationRepository<MonthlyCluster> {
    /**
     * Retrieves the monthly data for a given kood.
     * @param id - The company identifier identifier.
     * @returns A promise that resolves to the monthly cluster data.
     * 
     * 
     * @throws {Error('Number of missing properties exceeds the limit')},
     * @throws {Error('Object does not exist')}
     */
    async getMonthly(id: string, correlationID: string): Promise<MonthlyCluster | null> {
        const query = `
            SELECT *
                FROM "ELUJOULISUSEINDEKS"."KUISED"
                WHERE "kood" = :kood
            FETCH FIRST 1 ROWS ONLY
        `;
        try {
            const response = await dbQuery(query, { kood: id }, correlationID);
            const monthly = MonthlyCluster.deserialize(response).clamp();
            checkMissingProperties(monthly, 3);
            checkExists(monthly);
            return monthly;
        } catch (error) {
            switch (error.message) {
                case 'Number of missing properties exceeds the limi':
                    throw new Error('Number of missing properties exceeds the limi');
                case 'Object does not exist':
                default:
                    throw new Error('Monthly data not found');
            }
            
        }

    }

    async getSds(klaster: string, correlationID: string): Promise<MonthlyCluster | null> {
        const query = `
            SELECT *
                FROM "ELUJOULISUSEINDEKS"."NORM_KUU_SDS"
                WHERE "klaster" = :klaster
            FETCH FIRST 1 ROWS ONLY
        `
        try {
            const response = await dbQuery(query, { klaster }, correlationID);
            const formattedResponse = convertKeysToLowerCase(response);
            return MonthlyCluster.deserialize(formattedResponse).clamp();
        } catch (error) {
            throw Error('Monthly SDS not found');
        }
    }

    async getMea(klaster: string, correlationID: string): Promise<MonthlyCluster> {
        const query = `
            SELECT *
                FROM "ELUJOULISUSEINDEKS"."NORM_KUU_KESK"
                WHERE "klaster" = :klaster
            FETCH FIRST 1 ROWS ONLY
            `;
        try {
            const response = await dbQuery(query, { klaster }, correlationID);
            const formattedResponse = convertKeysToLowerCase(response);
            return MonthlyCluster.deserialize(formattedResponse).clamp();
        } catch (error) {
            throw Error('Monthly MEA not found');
        }
    }


}
