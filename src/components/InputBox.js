import React from "react";
import "./InputBox.css";
import { useState } from "react";
import { db } from "../firebase";
import { addDoc, collection, Timestamp } from "@firebase/firestore";

const InputBox = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    addDoc(collection(db, "notes"), {
      title,
      content,
      created: Timestamp.now(),
    })
      .then(() => {
        setTitle("");
        setContent("");
      })
      .catch((e) => alert(e));
  };
  return (
    <form class="newNote">
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        name="content"
        id="content"
        cols="30"
        rows="10"
        placeholder="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button className="addNoteButton" onClick={handleSubmit}>
        Add Note
      </button>
    </form>
  );
};

export default InputBox;
