import React from "react";
import Note from "./Note";

export default function NotesGrid({ notes, deleteNote}) {
  return (
    <div className="mt-6 grid-container">
      {notes.length > 0 ? (
        notes.map((note) => (
          <div key={note.id} className="grid-item">
            <Note
              id={note.id}
              title={note.title}
              content={note.content}
              color={note.color}
              date={note.date}
              pinned={note.pinned}
              deleteNote={deleteNote}
            />
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 col-span-full">
          No notes yet. Add one above!
        </p>
      )}
    </div>
  );
}
