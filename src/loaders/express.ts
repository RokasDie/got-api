import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import createError from "http-errors";
import routes from "../routes";

export default ({ app }: { app: Application }) => {
  app.use(bodyParser.json());
  // Load API routes
  app.use(routes());

  /// catch 404 and forward to error handler
  app.use((req: Request, res: Response, next: NextFunction) => {
    next(createError(404));
  });

  /// error handlers

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message
      }
    });
  });
};
