import { dbQuery } from "./database_client/query";
import { Monthly, MonthlyCluster } from "./models";
import { NormalisationRepository  } from "./repository";
import { checkMissingProperties  } from "./../application";


export class NormMonthlyRepository implements NormalisationRepository<MonthlyCluster>{
    /**
     * Retrieves the monthly data for a given kood.
     * @param id - The company identifier identifier.
     * @returns A promise that resolves to the monthly cluster data.
     */
    async getMonthly(id: string): Promise<Monthly> {
        const pg = `
            SELECT *
                FROM "elujoulisuseindeks"."kuised"
                WHERE "kood" = "${id}"
            LIMIT 1;
        `
        const oracle = `
            SELECT *
                FROM elujoulisuseindeks.kuised
                WHERE kood = '${id}'
            FETCH FIRST 1 ROWS ONLY
        `
        const response = await dbQuery(pg, oracle);
        const res = Monthly.deserialize(response);
        checkMissingProperties(res, 3);
        return res;
    }

    async getSds(klaster: string): Promise<MonthlyCluster> {
        const pg = `
            SELECT *
                FROM "elujoulisuseindeks"."norm_kuu_sds"
                WHERE "klaster" = "${klaster}"
            LIMIT 1;
        `
        const oracle = `
            SELECT *
                FROM elujoulisuseindeks.norm_kuu_sds
                WHERE klaster = '${klaster}'
            FETCH FIRST 1 ROWS ONLY
        `
        const response = await dbQuery(pg, oracle);
        const result = MonthlyCluster.deserialize(response).clamp();
        return result;
    }
    
    async getMea(klaster: string): Promise<MonthlyCluster> {
        const pg = `
            SELECT *
                FROM "elujoulisuseindeks"."norm_kuu_kesk"
                WHERE "klaster" = "${klaster}"
            LIMIT 1;
        `
        const oracle = `
            SELECT *
                FROM elujoulisuseindeks.norm_kuu_kesk
                WHERE klaster = '${klaster}'
            FETCH FIRST 1 ROWS ONLY
        `
        const response = await dbQuery(pg, oracle);
        const result = MonthlyCluster.deserialize(response).clamp();
        return result;
    }
}