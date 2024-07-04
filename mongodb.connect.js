const dotenv = require('dotenv');
// Determine the current environment
const env = process.env.NODE_ENV || 'development';
// Load the appropriate .env file based on the current environment
dotenv.config({ path: `.env.${env}` });

const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://" + process.env.MONGO_USERNAME + ":" + process.env.MONGO_PASSWORD + "@atlascluster.ru65j9u.mongodb.net/" + process.env.MONGO_DB_NAME + "?retryWrites=true&w=majority&appName=AtlasCluster";
// const mongoURI = "mongodb+srv://jesusenriquecarrero:Jesusjeco19*@atlascluster.ru65j9u.mongodb.net/Mainproca?retryWrites=true&w=majority&appName=AtlasCluster";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected running in " + env + " mode");

    // const collections = await mongoose.connection.db.listCollections().toArray();
    // console.log(collections);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;