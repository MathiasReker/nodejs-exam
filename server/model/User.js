import mongoose from "mongoose";
import { randomUUID } from "crypto";

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
    uuid: {
        type: String,
        required: true,
        default: () => {
            return randomUUID();
        }
    }
});

export default mongoose.model("User", userSchema);
