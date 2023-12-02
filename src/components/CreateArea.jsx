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

  return (
    <div>
      <form className="create-note" onSubmit={(e) => e.preventDefault()}>
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
              setNote({ title: "", content: "" });
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
