import express, { Request, Response } from 'express';
import handleCompanyId from './application/routes/eestat/1/elujoud/id';

require('dotenv').config();

export const port = 3000;

const app = express();
app.use('/static', express.static('models'))
app.get('/eestat/1/elujoud/:id', async (req: Request, res: Response) => handleCompanyId(req, res));

/**
 * GET /healthz
 * @summary Check if the server is up and running
 * @return 200 - Success - application/json
 * @tags General
 */
app.get('/healthz', (_req, res) => res.status(200).json({ status: 'ok' }));

// all other routes should throw 404 not found
app.use('*', (_req, res) => {
    return 
});

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
