import { Router, Request, Response, NextFunction } from "express";
import { battleStatistics } from "../models/queries";
import createError from "http-errors";

const route = Router();

export default (app: Router) => {
  app.use("/stats", route);
  route.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get all battle statistics from Mongo DB
      const statistics = await battleStatistics();
      interface Options {
        _id: string;
        name: string;
      }
      const uniqueBattleTypes = statistics[0]["battleTypes"].map(
        (battle: Options) => battle.name
      );

      const responseObject = {
        most_active: {
          attacker_king: statistics[0]["attackerKing"],
          defender_king: statistics[0]["defenderKing"],
          region: statistics[0]["region"]
        },
        attacker_outcome: {
          win: statistics[0]["attacker_outcome_win"],
          loss: statistics[0]["attacker_outcome_loss"]
        },
        battle_type: uniqueBattleTypes,
        defender_size: {
          average: statistics[0]["average"],
          min: statistics[0]["minimum"],
          max: statistics[0]["maximum"]
        }
      };

      res.json(responseObject).status(200);
    } catch (error) {
      next(createError(500));
    }
  });
};
