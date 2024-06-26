import { oracleQuery } from "./oracle";
import { pgQuery } from "./postgres";
import {cleanifyJson} from "../../application";

require('dotenv').config();
let { DATABASE } = process.env;

export async function dbQuery(pg: string, oracle: string): Promise<Record<string, any>> {
    switch (DATABASE) {
        case 'postgres':
            const pgResponse = await pgQuery(pg);
            const pgJson = cleanifyJson(pgResponse.rows[0]);
            return pgJson;
        case 'oracle':
            const oracleResponse =await oracleQuery(oracle);
            const oracleJson = cleanifyJson(oracleResponse.rows[0]);
            return oracleJson;
        default:
            throw new Error('Database not found');
    }
}
