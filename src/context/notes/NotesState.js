import React, { useState } from "react";

import NoteContext from "./notesContext";

const NoteState = (props) => {
  const host = "http://localhost:2700";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  const getNotes = async () => {
    // TODO: API Call

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("logintoken"),
      },
    });

    const json = await response.json();
    setNotes(json);
  };

  // Add a Note

  const addNote = async (title, description, tag) => {
    // TODO: API Call

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("logintoken"),
      },

      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // Delete a Note

  const deleteNote = async (id) => {
    //API Call

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("logintoken"),
      },
    });
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
  };

  // Edit a Note

  const editNote = async (id, title, description, tag) => {
    // API CALL

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("logintoken"),
      },

      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();
    console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes));

    //Logic to edit in Client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];

      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;

        break;
      }
    }

    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
