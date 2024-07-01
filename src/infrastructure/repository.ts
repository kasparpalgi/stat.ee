import { dbQuery } from "./database_client/query";
import { Yearly,  YearlyCluster } from "./yearly";
import { MonthlyCluster } from "./monthly";
import { checkMissingProperties } from "../application";


export class Repository {
    /**
     * Retrieves the yearly data for a given jykood.
     * @param jykood - The jykood value.
     * @param maaProtsent - Optional land percentage value.
     * @returns A Promise that resolves to a Yearly object.
     */
    async getJykood(jykood: number, maaProtsent?: number|undefined ): Promise<Yearly> {
        const pg = `
            SELECT *
                FROM "elujoulisuseindeks"."aastased"
                WHERE "jykood" = ${jykood} 
                ${maaProtsent ? `AND "maa_protsent" >= ${maaProtsent}` : ''}
                ORDER BY "aasta" DESC
            LIMIT 1;
        `
        const oracle = `
            SELECT *
                FROM elujoulisuseindeks.aastased
                WHERE jykood = ${jykood}
                ${maaProtsent ? `AND maa_protsent >= ${maaProtsent}` : ''}
                ORDER BY aasta DESC
            FETCH FIRST 1 ROWS ONLY;
        `
        const response = await dbQuery(pg, oracle);
        const result = Yearly.deserialize(response);
        return result;
    }

    /**
     * Retrieves the YearlyCluster object for the specified klaster.
     * 
     * @param klaster - The klaster for which to retrieve the YearlyCluster object.
     * @returns A Promise that resolves to the YearlyCluster object.
     */
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

    /**
     * Retrieves the YearlyCluster object for the specified klaster.
     * @param klaster - The klaster identifier.
     * @returns A Promise that resolves to the YearlyCluster object.
     */
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

    /**
     * Retrieves the monthly cluster data for a given cluster.
     * @param klaster - The cluster identifier.
     * @returns A promise that resolves to the monthly cluster data.
     */
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