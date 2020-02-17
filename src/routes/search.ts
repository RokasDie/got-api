import { Router, Request, Response, NextFunction } from "express";
import Battle from "../models/battle";
import createError from "http-errors";

const route = Router();
export default (app: Router) => {
  app.use("/search", route);
  route.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      //   Object which stores how each query parameter should be searched in Mongo DB
      interface parametersObject {
        [key: string]: object;
      }
      const queryParamatersObject: parametersObject = {
        king: [
          { attacker_king: req.query.king },
          { defender_king: req.query.king }
        ],
        location: { location: req.query.location },
        type: { battle_type: req.query.type },
        year: { year: req.query.year },
        battle_number: { battle_number: req.query.battle_number },
        attacker: [
          { attacker_1: req.query.attacker },
          { attacker_2: req.query.attacker },
          { attacker_3: req.query.attacker },
          { attacker_4: req.query.attacker }
        ],
        defender: [
          { defender_1: req.query.defender },
          { defender_2: req.query.defender },
          { defender_3: req.query.defender },
          { defender_4: req.query.defender }
        ],
        attacker_outcome: { attacker_outcome: req.query.attacker_outcome },
        major_death: { major_death: req.query.major_death },
        major_capture: { major_capture: req.query.major_capture },
        region: { region: req.query.region }
      };

      // Create array which will be used to search for values based on entered parameters
      const constructFindArray = () => {
        const array = [];
        for (const element in req.query) {
          Array.isArray(queryParamatersObject[element])
            ? array.push({ $or: queryParamatersObject[element] })
            : array.push(queryParamatersObject[element]);
        }
        return array;
      };

      const results = await Battle.find({
        $and: constructFindArray()
      });
      return res.json(results).status(200);
    } catch (err) {
      next(createError(500));
    }
  });
};
