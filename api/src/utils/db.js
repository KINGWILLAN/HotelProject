import mongoose from "mongoose";
mongoose.Promise = global.Promise;

export const connectDatabase = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("🚀🚀🚀connected to database ✔️");
  } catch (error) {
    console.log("❌failed to connect to the DB", error);
  }
};
