const mongoose = require('mongoose');
const { ServerApiVersion } = require('mongodb');

const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 1) {
    // Already connected
    console.log("MongoDB connected")
    return mongoose.connection;
  }
  console.log(process.env.SERVER_MONGODB_URI)
  await mongoose.connect(process.env.SERVER_MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverAPI: ServerApiVersion.v1,
  });
  console.log("MongoDB Connected - New")
  return mongoose.connection;
};

module.exports = connectToDatabase;


