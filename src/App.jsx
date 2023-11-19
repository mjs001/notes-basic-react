import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
// import notes from "./notes";
import CreateArea from "./components/CreateArea";

function App() {
  const [notes, setNotes] = useState([
    {
      title: "Need to write more notes",
      content: "A lot more",
    },
  ]);

  function addNote(note) {
    setNotes((prev) => {
      return [...prev, note];
    });
  }

  function deleteNote(id) {
    setNotes((prev) => prev.filter((note, index) => index !== id));
  }

  return (
    <div>
      <Header />
      <CreateArea add={addNote} />
      {notes.map((note, index) => {
        return (
          <Note
            key={index}
            id={index}
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
