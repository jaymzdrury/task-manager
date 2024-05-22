import config from "./config/config";
const { origin } = config;

import express, { Application, Request, Response } from "express";
import { IncomingMessage, Server, ServerResponse } from "http";
import connectDB from "./config/db";
import cors, { CorsOptions } from "cors";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import logger from "./utils/logger";
import deserializeUser from "./middleware/deserializeUser";
import responseTime from "response-time";
import { restResponseTimeHistogram, startMetricsServer } from "./utils/metrics";
import routes from "./routeHandler";
import { NotFoundError } from "./errors/not-found";

const app: Application = express();
const port: string | number = process.env.PORT || 5000;
connectDB();

const options: CorsOptions = { origin };
app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(mongoSanitize());
app.use(cookieParser());
app.use(deserializeUser);
app.use(
  responseTime(
    (
      req: IncomingMessage,
      res: ServerResponse<IncomingMessage>,
      time: number
    ) => {
      if (req?.url) {
        restResponseTimeHistogram.observe(
          {
            method: req.method,
            route: req.url,
            status_code: res.statusCode,
          },
          time * 1000
        );
      }
    }
  )
);

app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));
routes(app);

app.all("*", async (req: Request, res: Response) => {
  throw new NotFoundError("App not found");
});

startMetricsServer();

const server: Server<typeof IncomingMessage, typeof ServerResponse> =
  app.listen(port, async () => {
    logger.info(`running on port ${port}`);
  });

process.on("unhandledRejection", (err) => {
  logger.error(`Error: ${err}`);
  server.close(() => process.exit(1));
});

export { app };
