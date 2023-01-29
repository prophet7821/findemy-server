const mongoose = require("mongoose");
const chalk = require("chalk");

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => {
      console.log(chalk.bold.green("Connected"));
    })
    .catch((err) => {
      console.log(chalk.bold.red(err));
    });
};

connectDB();

module.exports = connectDB;
