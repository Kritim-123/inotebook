import express from "express";
import Notes from "../models/Notes.js";
import { fetchuser } from "../middleware/fetchuser.js";
import { body, validationResult } from "express-validator";

const noteRoute = express.Router();

// ROUTE:1 Get all the notes using: GET "/api/notes/fetchallnotes". Login required

noteRoute.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// ROUTE:2 Add a new Note using: POST "/api/notes/addnote". Login required

noteRoute.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid name").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // Validate request body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // Corrected HTTP status code
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();

      res.json(savedNote); // Sending the savedNotes


    } catch (error) { // If we find any errors
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

export { noteRoute };
