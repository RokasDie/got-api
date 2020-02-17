import { Router } from "express";
import count from "./count";
import list from "./list";
import stats from "./stats";
import search from "./search";

export default () => {
  const app = Router();
  count(app);
  list(app);
  stats(app);
  search(app);
  return app;
};
