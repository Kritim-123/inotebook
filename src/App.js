import "./App.css";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Alert from "./components/Alert";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import NoteState from "./context/notes/NotesState";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />

          <Alert alert ={alert} />
          <div className="container">
            <Routes>
              <Route path="/about" element={<About />}></Route>

              <Route path="/" element={<Home showAlert= {showAlert}/>}></Route>

              <Route path="/login" element={<Login showAlert= {showAlert}/>}></Route>

              <Route path="/signup" element={<Signup showAlert= {showAlert}/>}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
