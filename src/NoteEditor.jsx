import { formatDate } from "./utils.jsx";

export default function NoteEditor({ note, onChange, onDelete, onBack }) {
  return (
    <>
      <div className="bar">
        <button className="back" onClick={onBack}>Back</button>
        <div className="meta">Edited {formatDate(note.updated)} · saved on this device</div>
        <button className="danger" onClick={onDelete}>Delete</button>
      </div>
      <input
        className="title"
        placeholder="Title"
        aria-label="Note title"
        value={note.title}
        onChange={(e) => onChange({ title: e.target.value })}
      />
      <textarea
        className="body"
        placeholder="Start writing…"
        aria-label="Note body"
        value={note.body}
        onChange={(e) => onChange({ body: e.target.value })}
      />
    </>
  );
}
