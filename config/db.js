const mongoose = require('mongoose');
const config = require('config');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || config.get('mongoURI'), {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.log(`MongoDB Connection Failed. Exiting: ${error}`);
    process.exit(1);
  }
};

module.exports = connectDB;
