import { dbQuery } from "./database/oracle";
import { YearlyCluster } from "./models";
import { NormalisationRepository as NormalisationRepository } from "./repository";


export class NormYearlyRepository implements NormalisationRepository<YearlyCluster> {
    async getSds(klaster: string, normSuffix: string, correlationID: string): Promise<YearlyCluster | null> {
        const query = `
            SELECT *
                FROM "ELUJOULISUSEINDEKS"."NORM_AASTA_SDS${normSuffix}"
                WHERE "klaster" = :klaster
            FETCH FIRST 1 ROWS ONLY
        `;
        try {
            const response = await dbQuery(query, { klaster }, correlationID);
            return YearlyCluster.deserialize(response).clamp();
        } catch {
            throw Error('Yearly SDS not found');
        }
    }

    async getMea(klaster: string, normSuffix: string, correlationID: string): Promise<YearlyCluster | null> {
        const query = `
            SELECT *
                FROM "ELUJOULISUSEINDEKS"."NORM_AASTA_KESK${normSuffix}"
                WHERE "klaster" = :klaster
            FETCH FIRST 1 ROWS ONLY
        `;
        try {
            const response = await dbQuery(query, { klaster }, correlationID);
            return YearlyCluster.deserialize(response).clamp();
        } catch  {
            throw Error('Yearly MEA not found');
        }
    }
}