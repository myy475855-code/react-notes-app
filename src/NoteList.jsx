import { formatDate, highlight, snippet } from "./utils.jsx";

export default function NoteList({ notes, selectedId, query, onSelect }) {
  return (
    <ul className="list">
      {notes.map((n) => (
        <li key={n.id}>
          <button
            className={"item" + (n.id === selectedId ? " sel" : "")}
            onClick={() => onSelect(n.id)}
          >
            <b>{highlight(n.title || "Untitled", query)}</b>
            <span>{highlight(snippet(n.body, query) || "No content", query)}</span>
            <small>{formatDate(n.updated)}</small>
          </button>
        </li>
      ))}
    </ul>
  );
}
