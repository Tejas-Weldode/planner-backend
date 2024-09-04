import express from "express";
import auth from "../middlewares/auth.js";
import Note from "../models/note.model.js";

const router = express.Router();

// Create a new note
router.post("/", auth, async (req, res) => {
    try {
        const { note } = req.body;
        const userId = req.userId; // Assuming `auth` middleware adds the userId to req object

        const newNote = new Note({
            userId,
            note,
        });

        await newNote.save();
        return res.status(201).json({ message: "Note saved", note:newNote });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

// Get all notes for the authenticated user
router.get("/", auth, async (req, res) => {
    try {
        const userId = req.userId;

        const notes = await Note.find({ userId });

        if (!notes.length) {
            return res
                .status(404)
                .json({ error: "No notes found for this user" });
        }

        return res.status(200).json(notes);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Get a note by id
// Returns 'note' object
router.get("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findById(id);

        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }

        return res.status(200).json(note);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Update a note by id
// Returns 'updatedNote' object
router.put("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { note } = req.body;

        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { note },
            { new: true, runValidators: true }
        );

        if (!updatedNote) {
            return res.status(404).json({ error: "Note not found" });
        }

        return res.status(200).json(updatedNote);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

// Delete a note by id
router.delete("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;

        const deletedNote = await Note.findByIdAndDelete(id);

        if (!deletedNote) {
            return res.status(404).json({ error: "Note not found" });
        }

        return res.status(204).json({ message: "Note deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default router;
