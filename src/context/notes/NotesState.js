import React, { useState } from "react";

import NoteContext from "./notesContext";

const NoteState = (props) => {
  const s1 = {
    name: "Kritim",
    class: "5b",
  };

  const [state, setState] = useState(s1);

  const update = () => {
    setTimeout(() => {
      setState({
        name: "Pritam",
        class: "10",
      });
    }, 1000);
  };
  return (
    <NoteContext.Provider value={{state, update}}>{props.children}</NoteContext.Provider>
  );
};

export default NoteState;
