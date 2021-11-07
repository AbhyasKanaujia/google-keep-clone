import React from "react";
import "./Card.css";
import { db } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";

const Card = ({ title, content, id }) => {
  const handleDelete = async (e) => {
    await deleteDoc(doc(db, "notes", id)).catch((e) => alert(e));
  };
  return (
    <div className="note">
      <h3>{title}</h3>
      <pre className="noteContent">{content}</pre>
      <i onClick={handleDelete} id={id} className="deleteBtn fas fa-trash"></i>
    </div>
  );
};

export default Card;
