import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  statistics: {
    lookups: {
      type: Number,
      default: 0,
    },
  },
  settings: {
    wineGlasses: {
      type: [String],
      required: false,
    },
    language: {
      type: String,
      required: true,
      default: 'en'
    }
  },
});

export default mongoose.model('User', userSchema);
