import mongoose from "mongoose";

const connection = async() => {
  try {
    await mongoose.connect("mongodb+srv://sumit1711:mongo@cluster0.yploscz.mongodb.net/");
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};

export default connection;
