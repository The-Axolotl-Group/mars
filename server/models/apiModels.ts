import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const Schema = mongoose.Schema;

// <--- Mars Schema --->
const marsWeatherSchema = new Schema({
  sol: Number,
  temp_avg: String,
  temp_min: String,
  temp_max: String,
  pressure: String,
  wind_speed: String,
});
const Mars = mongoose.model('mars', marsWeatherSchema, 'mars');

// <--- Earth Schema --->
const earthWeatherSchema = new Schema({
  date: String,
  temp_avg: String,
  temp_min: String,
  temp_max: String,
  pressure: String,
  wind_speed: String,
  humidity: String,
});
const Earth = mongoose.model('earth', earthWeatherSchema, 'earth');

// <--- Random Photos Schema --->
const photoSchema = new Schema({
  nasa_id: Number,
  sol: Number,
  img_src: String,
  earth_date: String,
});
const Photo = mongoose.model('photo', photoSchema, 'photos');

// <--- Picture of the Day (POD) Schema --->
const podSchema = new Schema({
  copyright: String,
  date: String,
  explanation: String,
  hdurl: String,
  title: String,
});
const Pod = mongoose.model('pod', podSchema, 'pods');

// <--- Message Schema --->
const messageSchema = new Schema({
  prompt: String,
  response_message: String,
  timestamp: { type: Date, default: Date.now },
});
const Message = mongoose.model('message', messageSchema, 'messages');

const model = {
  Message,
  Photo,
  Pod,
  Mars,
  Earth,
};

export default model;

async function connectToMongoDB() {
  try {
    if (!MONGO_URI) throw new Error('MONGO_URI is undefined.');

    await mongoose.connect(MONGO_URI, {
      dbName: 'Mars',
      serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
      },
    });

    console.log('Connected to MongoDB successfully.');
  } catch (err) {
    console.error(`MongoDB connection error: ${err}`);
  }
}

connectToMongoDB();
