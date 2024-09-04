import mongoose from "mongoose";
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    note: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Note = mongoose.model("note", noteSchema);

export default Note;
