import React, { useState } from "react";

function CreateArea(props) {
  const [note, setNote] = useState({ title: "", content: "" });

  function handleOnChange(e) {
    const { value, name } = e.target;
    setNote((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          onChange={handleOnChange}
          name="title"
          placeholder="Title"
          value={note.title}
        />
        <textarea
          onChange={handleOnChange}
          name="content"
          placeholder="Take a note..."
          rows="3"
          value={note.content}
        />
        <button
          onClick={() => {
            props.add(note);
            setNote({ title: "", content: "" });
          }}
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default CreateArea;
