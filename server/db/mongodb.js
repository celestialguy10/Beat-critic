import mongoose from "mongoose";

const ConnectDatabse = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB is connected");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default ConnectDatabse;
