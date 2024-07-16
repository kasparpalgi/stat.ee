import { dbQuery } from "./database/oracle";
import { MonthlyCluster } from "./models";
import { NormalisationRepository  } from "./repository";
import { checkMissingProperties, convertKeysToLowerCase  } from "./../application";


export class NormMonthlyRepository implements NormalisationRepository<MonthlyCluster>{
    /**
     * Retrieves the monthly data for a given kood.
     * @param id - The company identifier identifier.
     * @returns A promise that resolves to the monthly cluster data.
     */
    async getMonthly(id: string): Promise<MonthlyCluster> {
        const query = `
            SELECT *
                FROM "ELUJOULISUSEINDEKS"."KUISED"
                WHERE "kood" = ${id}
            FETCH FIRST 1 ROWS ONLY
        `;
        const response = await dbQuery(query);
        const res = MonthlyCluster.deserialize(response).clamp();
        checkMissingProperties(res, 3);

        return res;
    }

    async getSds(klaster: string): Promise<MonthlyCluster> {
        const query = `
            SELECT *
                FROM "ELUJOULISUSEINDEKS"."NORM_KUU_SDS"
                WHERE "klaster" = '${klaster}'
            FETCH FIRST 1 ROWS ONLY
        `

        const response = await dbQuery(query);
        const formattedResponse = convertKeysToLowerCase(response);
        const result = MonthlyCluster.deserialize(formattedResponse).clamp();

        return result;
    }
    
    async getMea(klaster: string): Promise<MonthlyCluster> {
        const query = `
            SELECT *
                FROM "ELUJOULISUSEINDEKS"."NORM_KUU_KESK"
                WHERE "klaster" = '${klaster}'
            FETCH FIRST 1 ROWS ONLY
        `;
        const response = await dbQuery(query);
        const formattedResponse = convertKeysToLowerCase(response);
        const result = MonthlyCluster.deserialize(formattedResponse).clamp();
        return result;
    }
}
