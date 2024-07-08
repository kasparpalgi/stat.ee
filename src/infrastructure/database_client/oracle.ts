import OracleDB from 'oracledb';

require('dotenv').config();

let { ORACLE_USER, ORACLE_PASSWORD, ORACLE_CONNECT_STRING } = process.env;

function cleanifyJson(json: Record<string, any>): Record<string, any> {
    return JSON.parse(JSON.stringify(json).replace(/"NA"/g, "0"));
}


export async function dbQuery(textQuery: string): Promise<any> {
    const connection = new DatabaseConnection();
    const dbConnect = await connection.connectWithDB();
    try {
        const result = await dbConnect.execute(textQuery);
        const oracleJson = cleanifyJson(result.rows[0]);
        return oracleJson;
    } catch (error) {
        console.log(error);
        throw new Error('Query not found');
    } finally {
        new DatabaseConnection().doRelease(dbConnect);
    }

}

export default class DatabaseConnection {
    private oracleDB = OracleDB;
    private dbConfig = {
        user: ORACLE_USER,
        password: ORACLE_PASSWORD,
        connectString: ORACLE_CONNECT_STRING,
    }

    public async init(): Promise<void> {
    }

    public async connectWithDB() : Promise<OracleDB.Connection> {
        return new Promise((resolve, reject) => {
            this.oracleDB.getConnection(this.dbConfig, (err, connection) => {
                if (err) {
                    reject(err.message);
                }
                console.log('Connected with Database...');
                resolve(connection);
            });
        });
    }

    public doRelease(connection) {
        connection.release((err) => {
            if (err)
                console.error(err.message);
            console.log('connection released');
        });
    }
}