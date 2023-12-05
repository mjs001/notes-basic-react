import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";
import "../sass/styles.scss";
import prodOrLocal from "./prodOrLocal";

export default function Notes() {
  var path = prodOrLocal();
  const [notes, setNotes] = useState([]);

  async function addNote(note) {
    await axios
      .post(`${path}/add`, {
        title: note.title,
        content: note.content,
      })
      .then((res) => setNotes((prev) => [...prev, res.data]))
      .catch((err) => console.error("ERROR", err));
  }

  async function getTodos() {
    await axios
      .get(`${path}/`)
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
      .put(`${path}/edit/${note.id}`, {
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
      .delete(`${path}/delete/${id}`)
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
