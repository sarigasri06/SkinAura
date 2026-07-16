const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

const connectDB = async () => {
  try {
    // Use in-memory MongoDB for local development
    if (!process.env.MONGO_URI || process.env.MONGO_URI.includes('localhost')) {
      console.log('Starting in-memory MongoDB (first run may take ~1min for binary download)...');
      mongoServer = await MongoMemoryServer.create({
        instance: {
          startupTimeout: 120000, // 2 minutes for first binary download
        },
        binary: {
          downloadTimeout: 120000,
        },
      });
      const uri = mongoServer.getUri();
      console.log(`In-Memory MongoDB started at: ${uri}`);
      const conn = await mongoose.connect(uri);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } else {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
