import React from "react";
import Masonry from "react-masonry-css";
import { AnimatePresence } from "framer-motion";
import Note from "./Note";

export default function NotesGrid({ notes, deleteNote }) {
  const breakpointColumnsObj = {
    default: 4,
    1400: 3,
    700: 2,
    400: 1,
  };

  return (
    <div className="mt-6">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex gap-4"
        columnClassName="bg-clip-padding"
      >
        <AnimatePresence>
          {notes.length > 0 ? (
            notes.map((note) => (
              <Note
                key={note.id}
                id={note.id}
                title={note.title}
                content={note.content}
                color={note.color}
                date={note.date}
                pinned={note.pinned}
                deleteNote={deleteNote}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 col-span-full">
              No notes yet. Add one above!
            </p>
          )}
        </AnimatePresence>
      </Masonry>
    </div>
  );
}
