import mongoose from "mongoose";

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
    myCollection: {
        type: [String],
        required: false,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    statistics: {
        lookups: {
            type: Number,
            default: 0,
        }
    },
    settings: {
        myCollection: {
            type: [String],
            required: false,
        }
    }

});

export default mongoose.model("User", userSchema);
// TODO: mycollection => settings