import { dbQuery } from "./database/oracle";
import { MonthlyCluster } from "./models";
import { NormalisationRepository } from "./repository";
import { checkExists, checkMissingProperties, convertKeysToLowerCase } from "./../application";

export class NormMonthlyRepository implements NormalisationRepository<MonthlyCluster> {
    /**
     * Retrieves the monthly data for a given kood.
     * @param id - The company identifier identifier.
     * @returns A promise that resolves to the monthly cluster data.
     * 
     * 
     * @throws {Error('Number of missing properties exceeds the limit')},§
     * @throws {Error('Does not exist')}
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
            checkExists(response);
            const monthly = MonthlyCluster.deserialize(response).clamp();
            checkMissingProperties(monthly, 3);
            return monthly;
        } catch (error) {
            switch (error.message) {
                case 'Number of missing properties exceeds the limi':
                    throw new Error('Number of missing properties exceeds the limi');
                case 'Does not exist':
                    throw new Error('Monthly data does not exist');
                default:
                    throw new Error('Failed to retrieve monthly data');
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
        } catch  {
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
        } catch {
            throw Error('Monthly MEA not found');
        }
    }


}
