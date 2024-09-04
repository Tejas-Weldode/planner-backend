import express from "express";
import auth from "../middlewares/auth.js";
import Event from "../models/event.model.js";

const router = express.Router();

// Create a new event
router.post("/", auth, async (req, res) => {
    try {
        const { event, dateTime } = req.body;
        const userId = req.userId;

        const newEvent = new Event({
            userId,
            event,
            dateTime,
        });

        await newEvent.save();
        return res
            .status(201)
            .json({ message: "Event created", event: newEvent });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

// Get an event by id
router.get("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findById(id);

        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }

        return res.status(200).json(event);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Get all events for the authenticated user, sorted by dateTime
router.get("/", auth, async (req, res) => {
    try {
        const userId = req.userId;

        // Find events for the user and sort by dateTime in ascending order
        const events = await Event.find({ userId }).sort({ dateTime: 1 });

        if (!events.length) {
            return res
                .status(404)
                .json({ error: "No events found for this user" });
        }

        return res.status(200).json(events);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Update an event by id
router.put("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { event, DateTime } = req.body;

        const updatedEvent = await Event.findByIdAndUpdate(
            id,
            { event, DateTime },
            { new: true, runValidators: true }
        );

        if (!updatedEvent) {
            return res.status(404).json({ error: "Event not found" });
        }

        return res
            .status(200)
            .json({ message: "Event updated", event: updatedEvent });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

// Delete an event by id
router.delete("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;

        const deletedEvent = await Event.findByIdAndDelete(id);

        if (!deletedEvent) {
            return res.status(404).json({ error: "Event not found" });
        }

        return res.status(204).json({ message: "Event deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default router;
