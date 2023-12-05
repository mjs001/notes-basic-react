import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";
import "../sass/styles.scss";
// import "dotenv/config";

export default function Notes() {
  const [notes, setNotes] = useState([]);

  async function addNote(note) {
    await axios
      .post(`${process.env.REACT_APP_SERVER_URL}/add`, {
        title: note.title,
        content: note.content,
      })
      .then((res) => setNotes((prev) => [...prev, res.data]))
      .catch((err) => console.error("ERROR", err));
  }

  async function getTodos() {
    await axios
      .get(`${process.env.REACT_APP_SERVER_URL}`)
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
      .put(`${process.env.REACT_APP_SERVER_URL}/edit/${note.id}`, {
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
      .delete(`${process.env.REACT_APP_SERVER_URL}/delete/${id}`)
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
