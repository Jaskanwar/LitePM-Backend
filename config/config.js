const mongoose = require("mongoose");
const uri = "mongodb+srv://Jaskanwar-Test:Testing@cluster0.g1kzq.mongodb.net/LitePM-Projects?retryWrites=true&w=majority"
const connectMongo = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("Mongo is Connected")
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectMongo;