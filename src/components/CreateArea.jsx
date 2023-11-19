import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import axios from "axios";

function CreateArea(props) {
  const [note, setNote] = useState({ title: "", content: "" });
  const [formExpanded, setFormExpanded] = useState(false);
  function handleOnChange(e) {
    const { value, name } = e.target;
    setNote((prev) => ({ ...prev, [name]: value }));
  }

  function handleExpanded() {
    setFormExpanded(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const host = window.location.host;
    const protocol = window.location.protocol;
    axios
      .post("http://localhost:8000/add", {
        title: note.title,
        content: note.content,
      })
      .then((res) => console.log("created"))
      .catch((err) => console.error("ERROR", err));

    setNote({ title: "", content: "" });
  }

  return (
    <div>
      <form className="create-note" onSubmit={handleSubmit}>
        {formExpanded ? (
          <input
            onClick={handleExpanded}
            onChange={handleOnChange}
            name="title"
            placeholder="Title"
            value={note.title}
          />
        ) : null}
        <textarea
          onClick={handleExpanded}
          onChange={handleOnChange}
          name="content"
          placeholder="Take a note..."
          rows={formExpanded ? 3 : 1}
          value={note.content}
        />

        <Zoom in={formExpanded ? true : false}>
          <Fab
            type="submit"
            className="add"
            onClick={() => {
              props.add(note);
            }}
          >
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
