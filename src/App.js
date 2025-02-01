import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Alert from "./components/Alert";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import NoteState from "./context/notes/NotesState";

function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />

          <Alert message="Gather your notes here" />
          <div className="container">
            <Routes>
              <Route path="/about" element={<About />}></Route>

              <Route path="/" element={<Home />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
