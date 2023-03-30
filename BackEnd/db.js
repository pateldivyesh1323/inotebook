const mongoose = require("mongoose");

// const mongoURI = "mongodb+srv://pateldivyesh:pateldivyesh%40gmail.com@cluster0.kyjcoxj.mongodb.net/test";
const mongoURI = "mongodb+srv://pateldivyesh:pateldivyesh@learningmongodb.fx38ltf.mongodb.net/?retryWrites=true&w=majority";

const  connectToMongo = async () => {
  mongoose.set("strictQuery",false);
  await mongoose.connect(mongoURI,()=>{
    console.log("Connected to MongoDB Successfully");
  });
}

module.exports = connectToMongo;