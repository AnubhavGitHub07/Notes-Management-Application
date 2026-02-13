import Note from "../models/note.js";
import asyncHandler from "express-async-handler";

// Create Note
const createNote = asyncHandler(async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        res.status(400);
        throw new Error("All fields are required");
    }

    const note = await Note.create({
        title,
        content,
        user: req.user._id,
    });

    res.status(201).json(note);
});

// Read ~ Find Notes ( of users those who have access )

const getNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find({
        user: req.user._id
    }).sort("-createdAt");

    res.status(200).json(notes);
});

// Update Note

const updateNote = asyncHandler(async (req, res) => {
    const { title, content } = req.body;

    const note = await Note.findById(req.params.id);

    if (!note) {
        res.status(404);
        throw new Error("Note not found");
    }

    // check ownership before giving access to update

    if (note.user.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error("Not authorized");
    }

    note.title = title || note.title;
    note.content = content || note.content;

    const updatedNote = await note.save();

    res.status(200).json(updatedNote);
});

// Delete Note

const deleteNote = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);

    if (!note) {
        res.status(404);
        throw new Error("Note not found");
    }

    // check ownership
    if (note.user.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error("Not authorized");
    }

    await note.deleteOne();

    res.status(200).json({ message: "Note deleted" });
});

export { createNote, getNotes, updateNote, deleteNote };