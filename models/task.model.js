import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    task: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        enum: ["pending","completed"],
        default: "pending",
    },
    dueDate: {
        type: Date,
    }
});

const Task = mongoose.model("task", taskSchema);

export default Task;
