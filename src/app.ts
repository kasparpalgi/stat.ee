import express, { Request, Response } from "express";
import handleRequest from "./application/routes/eestat/1/elujoud/id";
import { runApp } from "./application/server";
import { env } from './infrastructure/config/environment';

const app = express();


if (env.canUseDatabase()) {
  /**
  * GET /eestat/1/elujoud/:id
  * @summary Get a company prediction by ID
  * @param id - The ID of the company.
  * @return 200 - Success - application/json
  *
  * Use /eelstat/1/elujoud/12712965 for testing
  */
  app.get("/eestat/1/elujoud/:id", async (req: Request, res: Response) =>
    handleRequest(req, res)
  );
}


if (env.canUseJson()) {
/**
 * POST /eestat/1/elujoud
 * @summary Get a company prediction using JSON data
 * @param request.body - JSON containing company, yearly, and monthly data
 * @return 200 - Success - application/json
 */
app.post("/eestat/1/elujoud", express.json(), async (req: Request, res: Response) =>
  handleRequest(req, res)
);
}

/**
 * GET /healthz
 * @summary Check if the server is up and running
 * @return 200 - Success - application/json
 * @tags General
 */
app.get("/healthz", (_req: Request, res: Response) =>
  res.status(200).json({ status: "ok" })
);

// all other routes should throw 404 not found
app.use("*", (_req: Request, res: Response) => {
  return res.status(404).json({ message: "Not found" });
});

// Start the server
runApp(app);
