const mongoose = require('mongoose');
const { ServerApiVersion } = require('mongodb');

const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 1) {
    // Already connected
    console.log("MongoDB connected")
    return mongoose.connection;
  }

  await mongoose.connect(process.env.SERVER_MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverAPI: ServerApiVersion.v1,
    bufferCommands: false,
  });
  console.log("MongoDB Connected")
  return mongoose.connection;
};

module.exports = connectToDatabase;


