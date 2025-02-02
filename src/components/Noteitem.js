import React, {useContext} from "react";
import noteContext from "../context/notes/notesContext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { note, updateNote } = props;
  const { deleteNote } = context;
  return (
    <div className="col-md-3">
      <div className="card my-3" >
        <div className="card-body ">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text text-start">
          {note.description}
          </p> 

          <i className="fa-solid fa-trash mx-2" onClick={() => {deleteNote(note._id)}}></i>
          <i className="fa-solid fa-pen-to-square mx-2" onClick = {() => updateNote(note)}></i>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
