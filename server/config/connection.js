const mongoose = require('mongoose');
const { ServerApiVersion } = require('mongodb');

let isConnected;

const connectToDatabase = async () => {
  if (isConnected) return mongoose.connection;

  await mongoose.connect(process.env.SERVER_MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverAPI: ServerApiVersion.v1,
    bufferCommands: false,
  });

  isConnected = true;
  return mongoose.connection;
};

module.exports = connectToDatabase;

