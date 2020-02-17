import mongoose from "mongoose";
import { Db } from "mongodb";
export default async (): Promise<Db> => {
  const connection = await mongoose.connect(`${process.env.DB_CONNECTION}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  });
  return connection.connection.db;
};
