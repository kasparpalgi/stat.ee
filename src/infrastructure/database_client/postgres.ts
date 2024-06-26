import pg from 'pg'

require('dotenv').config();

let { PG_HOST, PG_DATABASE, PG_USER, PG_PASSWORD, PG_SSL, PG_PORT } = process.env;

PG_PASSWORD = decodeURIComponent(PG_PASSWORD);


const { Client } = pg
const pgConfig = {
    user: PG_USER,
    password: PG_PASSWORD,
    host: PG_HOST,
    port: PG_PORT,
    database: PG_DATABASE,
    ssl: PG_SSL,
}


export async function pgQuery(textQuery: string): Promise<any> {
    try {
        const client = new Client(pgConfig)
        await client.connect();
        const result = await client.query(textQuery);
        await client.end();
        return result;
    } catch (error) {
        console.log(error);
        throw new Error('Query not found');
    }
}


async function getPgVersion() {
    try {
        const result = await pgQuery('SELECT version()');
        console.log(result.rows[0]);
    } catch (error) {
        console.log(error);
    }
}

