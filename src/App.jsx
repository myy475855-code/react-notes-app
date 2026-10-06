import { useMemo, useState } from "react";
import useLocalStorage from "./useLocalStorage.js";
import NoteList from "./NoteList.jsx";
import NoteEditor from "./NoteEditor.jsx";
import { uid } from "./utils.jsx";

export default function App() {
  const [notes, setNotes] = useLocalStorage("notes-app:v1", []);
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(false); // mobile: show editor vs list

  const q = query.trim();

  const shown = useMemo(() => {
    const sorted = [...notes].sort((a, b) => b.updated - a.updated);
    if (!q) return sorted;
    const l = q.toLowerCase();
    return sorted.filter(
      (n) => n.title.toLowerCase().includes(l) || n.body.toLowerCase().includes(l)
    );
  }, [notes, q]);

  const current = notes.find((n) => n.id === selectedId) || null;

  const createNote = () => {
    const now = Date.now();
    const note = { id: uid(), title: "", body: "", created: now, updated: now };
    setNotes([note, ...notes]);
    setQuery("");
    setSelectedId(note.id);
    setEditing(true);
  };

  const updateNote = (patch) =>
    setNotes(
      notes.map((n) =>
        n.id === selectedId ? { ...n, ...patch, updated: Date.now() } : n
      )
    );

  const deleteNote = () => {
    if (!window.confirm("Delete this note? This can't be undone.")) return;
    setNotes(notes.filter((n) => n.id !== selectedId));
    setSelectedId(null);
    setEditing(false);
  };

  const selectNote = (id) => {
    setSelectedId(id);
    setEditing(true);
  };

  return (
    <div className={"app" + (editing ? " editing" : "")}>
      <div className="side">
        <div className="top">
          <input
            className="search"
            type="search"
            placeholder="Search notes"
            aria-label="Search notes"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="primary" onClick={createNote}>New note</button>
        </div>
        <div className="count">
          {q
            ? `${shown.length} of ${notes.length} notes match`
            : `${notes.length} ${notes.length === 1 ? "note" : "notes"}`}
        </div>
        {shown.length ? (
          <NoteList notes={shown} selectedId={selectedId} query={q} onSelect={selectNote} />
        ) : (
          <div className="empty">
            <p>{q ? `No notes match “${q}”. Try a different word.` : "No notes yet. Create your first note."}</p>
            {!q && <button className="primary" onClick={createNote}>New note</button>}
          </div>
        )}
      </div>

      <div className="main">
        {current ? (
          <NoteEditor
            note={current}
            onChange={updateNote}
            onDelete={deleteNote}
            onBack={() => setEditing(false)}
          />
        ) : (
          <div className="empty">
            <p>Select a note to edit it, or start a new one.</p>
            <button className="primary" onClick={createNote}>New note</button>
          </div>
        )}
      </div>
    </div>
  );
}
