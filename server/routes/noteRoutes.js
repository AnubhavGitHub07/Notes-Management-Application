// add notes routes 

import express from "express";
import { createNote, getNotes, updateNote, deleteNote } from "../controllers/noteController.js";
import protect from "../middleware/authmiddelware.js";

const noteRoutes = express.Router();

noteRoutes.use(protect); // all routes protected

noteRoutes.route("/")
    .post(createNote)
    .get(getNotes);

noteRoutes.route("/:id")
    .put(updateNote)
    .delete(deleteNote);

export default noteRoutes;