import { dbQuery } from "./database_client/query";
import { Yearly,  YearlyCluster } from "./yearly";
import { MonthlyCluster } from "./monthly";
import { checkMissingProperties } from "../application";


export class Repository {
    async getJykood(jykood: number, landPercent?: number|undefined ): Promise<Yearly> {
        const pg = `
            SELECT *
                FROM "elujoulisuseindeks"."aastased"
                WHERE "jykood" = ${jykood} 
                ${landPercent ? `AND "maa_protsent" >= ${landPercent}` : ''}
                ORDER BY "aasta" DESC
            LIMIT 1;
        `
        const oracle = `
            SELECT *
                FROM elujoulisuseindeks.aastased
                WHERE jykood = ${jykood}
                ${landPercent ? `AND maa_protsent >= ${landPercent}` : ''}
                ORDER BY aasta DESC
            FETCH FIRST 1 ROWS ONLY;
        `
        const response = await dbQuery(pg, oracle);
        const result = Yearly.deserialize(response);
        return result;
    }

    async getSds(klaster: string): Promise<YearlyCluster> {
        const pg = `
            SELECT *
                FROM "elujoulisuseindeks"."norm_aasta_sds_uus"
                WHERE "klaster" = '${klaster}' 
            LIMIT 1;
        `
        const oracle = `
            SELECT *
                FROM elujoulisuseindeks.norm_aasta_sds_uus
                WHERE klaster = '${klaster}'
            FETCH FIRST 1 ROWS ONLY;
        `
        const response = await dbQuery(pg, oracle);
        const result = YearlyCluster.deserialize(response).clamp();
        
        return result;
    }

    async getMea(klaster: string): Promise<YearlyCluster> {
        const pg = `
            SELECT *
                FROM "elujoulisuseindeks"."norm_aasta_kesk_uus"
                WHERE "klaster" = '${klaster}'
            LIMIT 1;
        `
        const oracle = `
            SELECT *
                FROM elujoulisuseindeks.norm_aasta_kesk_uus
                WHERE klaster = '${klaster}'
            FETCH FIRST 1 ROWS ONLY;
        `
        const response = await dbQuery(pg, oracle);
        const result = YearlyCluster.deserialize(response).clamp();

        return result;
    }

    async getMonthly(klaster: string): Promise<MonthlyCluster> {
        const pg = `
            SELECT *
                FROM "elujoulisuseindeks"."kuised"
                WHERE "klaster" = 'a' 
            LIMIT 1;
        `
        const oracle = `
            SELECT *
                FROM elujoulisuseindeks.kuised
                WHERE klaster = '${klaster}'
            FETCH FIRST 1 ROWS ONLY;
        `
        const response = await dbQuery(pg, oracle);
        
        const cluster = MonthlyCluster.deserialize(response).clamp();
        checkMissingProperties(cluster, 3);
        return cluster;
    }

}