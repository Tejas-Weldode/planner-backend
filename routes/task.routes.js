import express from "express";
import auth from "../middlewares/auth.js";
import Task from "../models/task.model.js";

const router = express.Router();

// Create a new task
router.post("/", auth, async (req, res) => {
    try {
        const { task, status, dueDate } = req.body;
        const userId = req.userId;

        const newTask = new Task({
            userId,
            task,
            status,
            dueDate,
        });

        await newTask.save();
        return res.status(201).json({ message: "Task created", task: newTask });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

// Get a task by id
router.get("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        return res.status(200).json(task);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Get all tasks for the authenticated user, sorted by dueDate
router.get("/", auth, async (req, res) => {
    try {
        const userId = req.userId;

        // Find tasks for the user and sort by dueDate in ascending order
        const tasks = await Task.find({ userId }).sort({ dueDate: 1 });

        if (!tasks.length) {
            return res
                .status(404)
                .json({ error: "No tasks found for this user" });
        }

        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Update a task by id
router.put("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { task, status, dueDate } = req.body;

        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { task, status, dueDate },
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ error: "Task not found" });
        }

        return res
            .status(200)
            .json({ message: "Task updated", task: updatedTask });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

// Delete a task by id
router.delete("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ error: "Task not found" });
        }

        return res.status(204).json({ message: "Task deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default router;
