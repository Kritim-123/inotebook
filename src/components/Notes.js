import React, { useContext } from "react";
import noteContext from "../context/notes/notesContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, addNote } = context;
  return (
    <>
      <AddNote />
      <div className="row my-3">
        <h2> Your Notes</h2>

        {notes.map((note) => {
          return <Noteitem key={note._id} note={note}></Noteitem>;
        })}
      </div>
    </>
  );
};

export default Notes;
