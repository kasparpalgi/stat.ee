import { dbQuery } from "./database_client/oracle";
import {  YearlyCluster } from "./models";
import { NormalisationRepository as NormalisationRepository } from "./repository";


export class NormYearlyRepository implements NormalisationRepository<YearlyCluster> {
    async getSds(klaster: string, normSuffix: string): Promise<YearlyCluster> {
        const query = `
            SELECT *
                FROM elujoulisuseindeks.norm_aasta_sds${normSuffix}
                WHERE klaster = '${klaster}'
            FETCH FIRST 1 ROWS ONLY
        `
        const response = await dbQuery(query);
        const result = YearlyCluster.deserialize(response).clamp();
        
        return result;
    }

    async getMea(klaster: string, normSuffix: string): Promise<YearlyCluster> {
        const query = `
            SELECT *
                FROM elujoulisuseindeks.norm_aasta_kesk${normSuffix}
                WHERE klaster = '${klaster}'
            FETCH FIRST 1 ROWS ONLY
        `
        const response = await dbQuery(query);
        const result = YearlyCluster.deserialize(response).clamp();

        return result;
    }
}