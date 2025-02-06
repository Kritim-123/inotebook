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
        "auth-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc5NTlhZmQ4MDgwZDNkYTc1YjQwYjQ5In0sImlhdCI6MTczNzkxMDY2OH0.Cs8RA89_zVFYmbVp1M-nOdPQA7okTlk3hTuvz05Rp1g",
      },

      
    });

  

    const json = await response.json()

    console.log(json);
    setNotes(json)

  }

  // Add a Note

  const addNote = async (title, description, tag) => {
    // TODO: API Call

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc5NTlhZmQ4MDgwZDNkYTc1YjQwYjQ5In0sImlhdCI6MTczNzkxMDY2OH0.Cs8RA89_zVFYmbVp1M-nOdPQA7okTlk3hTuvz05Rp1g",
      },

      body: JSON.stringify({title, description, tag}),
    });

    const json = await response.json();

    console.log(json)

    console.log("The note id is " + json._id)

    console.log("Adding a new note");
    const note = {
      _id: json._id,
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

  const deleteNote = async (id) => {

    //API Call

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc5NTlhZmQ4MDgwZDNkYTc1YjQwYjQ5In0sImlhdCI6MTczNzkxMDY2OH0.Cs8RA89_zVFYmbVp1M-nOdPQA7okTlk3hTuvz05Rp1g",
      },

      
    });

    const json = response.json();


    console.log("Delete the note with id" + id);
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
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc5NTlhZmQ4MDgwZDNkYTc1YjQwYjQ5In0sImlhdCI6MTczNzkxMDY2OH0.Cs8RA89_zVFYmbVp1M-nOdPQA7okTlk3hTuvz05Rp1g",
      },

      body: JSON.stringify({title, description, tag}),
    });

    const json = await response.json();
    console.log (json)


    let newNotes = JSON.parse(JSON.stringify(notes))

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
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
