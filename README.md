# React Notes App

Create, edit, delete and search notes. Notes are saved in localStorage (`notes-app:v1`).

## Run
```
npm install
npm run dev
```
Build for production with `npm run build` (output in `dist/`).

## Structure
- `src/App.jsx` – state, search, create/update/delete
- `src/NoteList.jsx` – note list with search highlighting
- `src/NoteEditor.jsx` – title/body editor
- `src/useLocalStorage.js` – localStorage-backed state hook
