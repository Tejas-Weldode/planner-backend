import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    event: {
        type: String,
        trim: true,
    },
    dateTime: {
        type: Date,
        required: true,
    },
});

const Event = mongoose.model("event", eventSchema);

export default Event;
