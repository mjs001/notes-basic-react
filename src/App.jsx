import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
// import notes from "./notes";
import CreateArea from "./components/CreateArea";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(note) {
    setNotes((prev) => {
      return [...prev, note];
    });
  }

  function getTodos() {
    axios
      .get("http://localhost:8000/")
      .then((res) => setNotes(res.data))
      .catch((err) => console.error("ERROR", err));
  }

  useEffect(() => {
    if (notes.length < 1) {
      getTodos();
    }
  }, []);

  function deleteNote(id) {
    console.log("ID inside delete", id);
    axios
      .delete(`http://localhost:8000/delete/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.error("ERROR", err));
    setNotes((prev) => prev.filter((insideId) => insideId.id !== id));
  }

  return (
    <div>
      <Header />
      <CreateArea add={addNote} />
      {console.log(notes)}
      {notes.map((note) => {
        return (
          <Note
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
            delete={deleteNote}
          />
        );
      })}

      <Footer />
    </div>
  );
}

export default App;
