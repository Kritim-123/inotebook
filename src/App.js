import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import NoteState from "./context/notes/NotesState";

function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/about" element={<About />}></Route>

            <Route path="/home" element={<Home />}></Route>
          </Routes>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
