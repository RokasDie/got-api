import expressLoader from "./express";
import Logger from "./logger";
import mongooseLoader from "./mongoose";

export default async ({ expressApp }: { expressApp: any }) => {
  await mongooseLoader();
  Logger.info("DB loaded and connected!");

  await expressLoader({ app: expressApp });
  Logger.info("Express loaded");
};
