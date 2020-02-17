import { Router, Request, Response, NextFunction } from "express";
import Battle from "../models/battle";
import createError from "http-errors";

const route = Router();

export default (app: Router) => {
  app.use("/list", route);
  route.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const battleLocations = await Battle.aggregate([
        { $match: { location: { $nin: [null, ""] } } },
        { $group: { _id: "$location" } },
        { $project: { name: "$_id" } }
      ]);

      const locationArray = battleLocations.map(element => {
        return element.name;
      });
      return res.json(locationArray).status(200);
    } catch (err) {
      next(createError(500));
    }
  });
};
