import express, { Request, Response } from 'express';
import { sendError } from './application';
import { ReasonPhrases } from 'http-status-codes';
import handleElujoud from './application/routes/eestat/1/elujoud/id';
import handleFilteredAastased from './application/routes/filtered-aastased/id';

require('dotenv').config();

export const port = 3000;

const app = express();
app.use(require('express-status-monitor')());
app.use('/static', express.static('models'))
app.get('/eestat/1/elujoud/:id', async (req: Request, res: Response) => handleElujoud(req, res));
app.get('/filtered-aastased/:id', async (req: Request, res: Response) => handleFilteredAastased(req, res));

/**
 * GET /healthz
 * @summary Check if the server is up and running
 * @return 200 - Success - application/json
 * @tags General
 */
app.get('/healthz', (_req, res) => res.json(ReasonPhrases.OK));

// all other routes should throw 404 not found
app.use('*', (_req, res) => {
    return sendError(res, 'route-not-found');
});

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
