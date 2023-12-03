import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

function Note(props) {
  const [editing, setEditing] = useState(false);
  const [note, setNote] = useState({
    id: props.id,
    title: props.title,
    content: props.content,
  });

  function handleOnChange(e) {
    const { value, name } = e.target;
    setNote((prev) => ({ ...prev, [name]: value }));
  }
  return (
    <div className="note">
      <p style={{ display: "none" }}>{note.id}</p>
      {editing ? (
        <>
          <div className="inputsContainer">
            <input
              className="editInputs titleInput"
              onChange={handleOnChange}
              name="title"
              placeholder="Title"
              value={note.title}
              type="text"
            />
            <span class="highlight"></span>
            <span class="bar"></span>
          </div>
          <div className="inputsContainer">
            <textarea
              className="editInputs contentInput"
              onChange={handleOnChange}
              name="content"
              placeholder="Content"
              value={note.content}
            />
            <span class="highlight"></span>
            <span class="bar"></span>
          </div>
          <div className="btnContainer">
            <button
              className="acceptChangesBtn"
              onClick={() => {
                setEditing((prev) => !prev), props.edit(note);
              }}
            >
              <CheckCircleIcon />
            </button>
            <button
              className="cancelBtn"
              onClick={() => {
                setEditing((prev) => !prev);
              }}
            >
              <CancelIcon />
            </button>
          </div>
        </>
      ) : (
        <>
          <p style={{ display: "none" }}>{props.id}</p>
          <h1>{props.title}</h1>
          <p>{props.content}</p>
          <div className="btnContainer">
            <button
              className="editBtn"
              onClick={() => {
                setEditing((prev) => !prev);
              }}
            >
              <EditIcon />
            </button>
            <button
              className="deleteBtn"
              onClick={() => {
                props.delete(props.id);
              }}
            >
              <DeleteIcon />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Note;
