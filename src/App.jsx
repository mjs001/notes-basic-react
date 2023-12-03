import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
// import notes from "./notes";
import CreateArea from "./components/CreateArea";
import axios from "axios";
import "./sass/styles.scss";

function App() {
  const [notes, setNotes] = useState([]);

  async function addNote(note) {
    const host = window.location.host;
    const protocol = window.location.protocol;
    await axios
      .post("http://localhost:8000/add", {
        title: note.title,
        content: note.content,
      })
      .then((res) => setNotes((prev) => [...prev, res.data]))
      .catch((err) => console.error("ERROR", err));
  }

  async function getTodos() {
    await axios
      .get("http://localhost:8000/")
      .then((res) => setNotes(res.data))
      .catch((err) => console.error("ERROR", err));
  }

  useEffect(() => {
    getTodos();
  }, []);

  async function editNote(note) {
    const host = window.location.host;
    const protocol = window.location.protocol;
    var copyNotes = [...notes];
    var index = notes.findIndex((n) => n.id === note.id);
    copyNotes.splice(index, 1, {
      id: note.id,
      title: note.title,
      content: note.content,
    });
    await axios
      .put(`http://localhost:8000/edit/${note.id}`, {
        id: note.id,
        title: note.title,
        content: note.content,
      })
      .then((res) => {
        setNotes(copyNotes);
      })
      .catch((err) => console.error("ERROR", err));
  }

  async function deleteNote(id) {
    await axios
      .delete(`http://localhost:8000/delete/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.error("ERROR", err));
    return setNotes((prev) => prev.filter((insideId) => insideId.id !== id));
  }

  return (
    <div>
      <Header />
      <CreateArea add={addNote} />
      {notes &&
        notes.map((note) => {
          return (
            <Note
              key={note.id}
              id={note.id}
              title={note.title}
              content={note.content}
              delete={deleteNote}
              edit={editNote}
            />
          );
        })}

      <Footer />
    </div>
  );
}

export default App;
