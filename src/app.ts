import dotenv from "dotenv";
import express from "express";
import Logger from "./loaders/logger";
dotenv.config();

async function startServer() {
  function normalizePort(val: any) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
      // named pipe
      return val;
    }

    if (port >= 0) {
      // port number
      return port;
    }

    return false;
  }
  const app: express.Application = express();
  await require("./loaders").default({ expressApp: app });

  const port = normalizePort(process.env.SERVER_PORT);

  // start the express server
  app.listen(port, (err: Error) => {
    if (err) {
      Logger.error(err);
      process.exit(1);
    }
    Logger.info(`Server listening on port: ${port} `);
  });
}

startServer();
