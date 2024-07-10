import { dbQuery } from "./database/oracle";
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
        const query = `
            SELECT *
                FROM ELUJOULISUSEINDEKS.KUISED
                WHERE kood = ${id}
            FETCH FIRST 1 ROWS ONLY
        `;
        const response = await dbQuery(query);
        const res = Monthly.deserialize(response);
        checkMissingProperties(res, 3);
        return res;
    }

    async getSds(klaster: string): Promise<MonthlyCluster> {
        const query = `
            SELECT *
                FROM ELUJOULISUSEINDEKS.NORM_KUU_SDS
                WHERE klaster = '${klaster}'
            FETCH FIRST 1 ROWS ONLY
        `
        const response = await dbQuery(query);
        const result = MonthlyCluster.deserialize(response).clamp();
        return result;
    }
    
    async getMea(klaster: string): Promise<MonthlyCluster> {
        const query = `
            SELECT *
                FROM ELUJOULISUSEINDEKS.NORM_KUU_KESK
                WHERE klaster = '${klaster}'
            FETCH FIRST 1 ROWS ONLY
        `;
        const response = await dbQuery(query);
        const result = MonthlyCluster.deserialize(response).clamp();
        return result;
    }
}