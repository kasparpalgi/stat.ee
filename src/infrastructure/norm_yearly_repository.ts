import { CompanyRepository } from "./company_year_repository";
import { dbQuery } from "./database_client/query";
import {  Company, CompanyYear, YearlyCluster } from "./models";
import { NormalisationRepository as NormalisationRepository } from "./repository";


export class NormYearlyRepository implements NormalisationRepository<YearlyCluster> {

    


    async getSds(klaster: string, normSuffix: string): Promise<YearlyCluster> {
        const pg = `
            SELECT *
                FROM "elujoulisuseindeks"."norm_aasta_sds${normSuffix}"
                WHERE klaster = "${klaster}"
            LIMIT 1;
        `
        const oracle = `
            SELECT *
                FROM elujoulisuseindeks.norm_aasta_sds${normSuffix}
                WHERE klaster = '${klaster}'
            FETCH FIRST 1 ROWS ONLY
        `
        const response = await dbQuery(pg, oracle);
        const result = YearlyCluster.deserialize(response).clamp();
        
        return result;
    }

    async getMea(klaster: string, normSuffix: string): Promise<YearlyCluster> {
        const pg = `
            SELECT *
                FROM "elujoulisuseindeks"."norm_aasta_kesk${normSuffix}"
                WHERE klaster = "${klaster}"
            LIMIT 1;
        `
        const oracle = `
            SELECT *
                FROM elujoulisuseindeks.norm_aasta_kesk${normSuffix}
                WHERE klaster = '${klaster}'
            FETCH FIRST 1 ROWS ONLY
        `

        const response = await dbQuery(pg, oracle);
        const result = YearlyCluster.deserialize(response).clamp();

        return result;
    }
}