import mongoose from "mongoose";
import debugCreator from "debug";

const debug = debugCreator("items:database");

const databaseConnection = async (mongoUrl: string) =>
  mongoose
    .connect(mongoUrl, { dbName: "items" })
    .then(() => {
      debug("Connected correctly to the database.");
    })
    .catch((error) => {
      debug("Error connecting to the database", error);
    });

export default databaseConnection;
