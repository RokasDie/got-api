import { Router, Request, Response, NextFunction } from "express";
import Battle from "../models/battle";
import createError from "http-errors";

const route = Router();

export default (app: Router) => {
  app.use("/count", route);
  route.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const totalBattles = await Battle.countDocuments();
      return res.json({ totalBattles }).status(200);
    } catch (err) {
      next(createError(500));
    }
  });
};
