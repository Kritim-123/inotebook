import React, { useState } from "react";

import NoteContext from "./notesContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "6796828ad784587bb619b881",
      user: "67959afd8080d3da75b40b49",
      title: "New title",
      description: "Focus on your craft",
      tag: "personal",
      date: "2025-01-26T18:44:26.194Z",
      __v: 0,
    },
    {
      _id: "679d628428154b367f46d479",
      user: "67959afd8080d3da75b40b49",
      title: "Kritim Bastola",
      description: "Today is a very good day to be doing code in my room",
      tag: "personal",
      date: "2025-01-31T23:53:40.135Z",
      __v: 0,
    },
    {
      _id: "679d62a028154b367f46d47b",
      user: "67959afd8080d3da75b40b49",
      title: "Lunch",
      description: "I want to eat chipotle for lunch today",
      tag: "personal",
      date: "2025-01-31T23:54:08.791Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);

  // Add a Note

  const addNote = (title, description, tag) => {
    // TODO: API Call

    console.log("Adding a new note")
    const note = {
      _id: "679d62a028154b367f46d47b",
      user: "67959afd8080d3da75b40b49",
      title: title,
      description: description,
      tag: tag,
      date: "2025-01-31T23:54:08.791Z",
      __v: 0,
    };

    setNotes(notes.concat(note));
  };

  // Delete a Note

  const deleteNote = (id) => {
    console.log("Delete the note with id" + id)
    const newNote = notes.filter((note) => {return note._id !==id})
    setNotes(newNote);
  };

  // Edit a Note

  const editNote = (id, titile, description, tag) => {};

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
