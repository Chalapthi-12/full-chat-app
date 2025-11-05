import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => console.log("DB Connected Successfully"));
  } catch (error) {
    console.log(error.message);
  }
};
export { connectDB };
