import express, { Request, Response } from 'express';
import { logger } from './utils/logger';
import { sendError } from './utils/errors';
import { ReasonPhrases } from 'http-status-codes';
import ModelRunner from './predictor';


const app = express();
export const port = 80;
app.use(require('express-status-monitor')());
app.use('/static',express.static('models'))
app.get('/eestat/1/elujoud/:id', async (req: Request, res: Response) => new ModelRunner().handleRequest(req, res));

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
    logger.info(`Running on port ${port}`);
});
