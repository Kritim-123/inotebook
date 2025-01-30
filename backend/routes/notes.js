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
    } catch (error) {
      // If we find any errors
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// ROUTE:3 Upate an exising note using: PUT "/api/notes/updatenote". Login required

noteRoute.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    //Create a newNote object

    const newNote = {};

    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // Find the note to be updated
    let note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(404), send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// ROUTE:4 Delete an exising note using: DELETE "/api/notes/deletenote". Login required

noteRoute.delete("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    // Find the note to be deleted
    let note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(404), send("Not Found");
    }

    // Allow deletion only if user owns this Note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    note = await Notes.findByIdAndDelete(
      req.params.id
    );
    res.json({ "Success" : "Note has been deleted", note : note});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

export { noteRoute };
