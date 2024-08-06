const mongoose = require('mongoose');
const { ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv')

dotenv.config()

mongoose.connect(
  process.env.SERVER_MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverAPI: ServerApiVersion.v1
  }
);

module.exports = mongoose.connection;

