const mongoose = require("mongoose");

// const mongoURI = "mongodb+srv://pateldivyesh:pateldivyesh%40gmail.com@cluster0.kyjcoxj.mongodb.net/test";
const mongoURI = "mongodb://0.0.0.0:27017/inotebook";

const  connectToMongo = async () => {
  mongoose.set("strictQuery",false);
  await mongoose.connect(mongoURI,()=>{
    console.log("Connected to MongoDB Successfully");
  });
}

module.exports = connectToMongo;