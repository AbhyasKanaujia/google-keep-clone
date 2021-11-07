import InputBox from "./components/InputBox";
import Card from "./components/Card";
import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

function App() {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    const notesRef = collection(db, "notes");
    const q = query(notesRef, orderBy("created", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setNotes(docs);
    });
  }, []);

  return (
    <div className="app">
      <header>
        <h1>Keeper</h1>
      </header>
      <div className="main">
        <InputBox />
        <div className="notesContainer">
          {notes.map((note) => (
            <Card
              title={note.data.title}
              content={note.data.content}
              id={note.id}
            />
          ))}
        </div>
      </div>
      <footer>
        Made with <span style={{ color: "red" }}>❤</span> by Abhyas
      </footer>
    </div>
  );
}

export default App;
