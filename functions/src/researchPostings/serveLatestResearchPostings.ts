// ./functions/src/firestore/serveLatestResearchPostings.ts
//
// Cloud Function for Firebase to serve the latest official OSU research postings
// as a public REST API endpoint, only responding to GET requests.

// Cloud Functions for Firebase SDK imports.
import { https, logger } from "firebase-functions/v1";

import cors from "cors";
// Secure express app essential imports.
import express, { type Express, type Request, type Response } from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";

// Research postings schema and type imports.
import { ResearchPostingSchema } from "@keminghe/osu";

// Local research posting accessor middleware import.
import serveLatestResearchPostingsMiddleware from "./serveLatestResearchPostingsMiddleware";

// -----------------------------------------------------------------------------
// Setup a secure express app to serve the latest research postings.
// Init the mini express app.
const app: Express = express();

// Automatically allow cross-origin requests.
app.use(cors({ origin: true }));

// Automatically add security headers to all responses.
app.use(helmet());

const limiter = rateLimit(
  // biome-ignore format: added alignment for clarity.
  {
    windowMs  : 15 * 60 * 1000,   // 15 minutes per window.
    max       : 100,              // Max 100 requests per 15-minute window per IP.
    statusCode: 418,
    message   : "I'm a teapot.",
},
);

// Limit requests to the API endpoint.
app.use(limiter);

// ---------------------------------------------------------------------------
// Setup GET route for the latest research postings.
app.get(
  "/",
  serveLatestResearchPostingsMiddleware,
  (request: Request, response: Response) => {
    // Validate response.locals from middleware.
    if (!response.locals.fetchTimestamp) {
      logger.error(
        'Invalid response from "serveLatestResearchPostingsMiddleware": missing "fetchTimestamp".',
      );
      response.status(500).send("Internal server error.");
      return;
    }

    if (!response.locals.postings) {
      logger.error(
        'Invalid response from "serveLatestResearchPostingsMiddleware": missing "postings".',
      );
      response.status(500).send("Internal server error.");
      return;
    }

    if (
      !ResearchPostingSchema.array().safeParse(response.locals.postings).success
    ) {
      logger.error(
        'Invalid response from "serveLatestResearchPostingsMiddleware": "postings" do not match schema.',
      );
      response.status(500).send("Internal server error.");
      return;
    }

    response.status(200).json(
      // biome-ignore format: added alignment for clarity.
      {
          fetchTimestamp: response.locals.fetchTimestamp,
          postings      : response.locals.postings,
      },
    );
  },
);

// ---------------------------------------------------------------------------
// Setup catch all route for unsupported methods.
app.all("*", (request: Request, response: Response) => {
  response.status(418).send("I'm a teapot.");
});

// -----------------------------------------------------------------------------
export const serveLatestResearchPostings = https.onRequest(app);
