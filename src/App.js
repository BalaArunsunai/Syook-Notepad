import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import NoteEntry from "./components/NoteEntry/NoteEntry";
import NoteListing from "./components/NoteListing/NoteListing";
function App() {
  useEffect(() => {
    localStorage.setItem("list", "[]");
    localStorage.setItem("id", "0");
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <h3>Syook Notepad</h3>
        <NoteEntry/>
      </header>
    </div>
  );
}

export default App;
