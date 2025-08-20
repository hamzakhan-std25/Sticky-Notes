import React, { useEffect, useState } from 'react';
import NoteForm from './NoteForm';
import NotesGrid from './NotesGrid';


    // This component serves as the main entry point for the Home section of the application.
    // It can be used to render components like NoteGrid, NoteForm, and Note.

export default function Home() {

    const [notes, setNotes] = useState([]);



    useEffect(() => {

        // Load notes from localStorage when the component mounts
        const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
        setNotes(savedNotes);
    }, []);

    useEffect(() => {
        // Save notes to localStorage whenever the notes state changes
        console.log("Saving notes to localStorage:", notes);
        if (!notes) return;
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);



    // Add new note
    const addNote = (note) => {
        setNotes((prevNotes) => [note, ...prevNotes]); // add new note at top
    };





    // Delete note by id
    const deleteNote = (id) => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    };



 


    return (
          <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-indigo-500">📝 Sticky Notes</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button className="w-full text-left px-4 py-2 rounded-md hover:bg-indigo-100 dark:hover:bg-gray-700">
            All Notes
          </button>
          <button className="w-full text-left px-4 py-2 rounded-md hover:bg-indigo-100 dark:hover:bg-gray-700">
            Pinned
          </button>
          <button className="w-full text-left px-4 py-2 rounded-md hover:bg-indigo-100 dark:hover:bg-gray-700">
            Trash
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md">
          <h1 className="text-xl font-bold">My Sticky Notes</h1>
          <button
            onClick={() => document.documentElement.classList.toggle("dark")}
            className="px-3 py-1 rounded-md bg-indigo-500 text-white hover:bg-indigo-600 transition"
          >
            Toggle Dark Mode
          </button>
        </header>

        {/* Notes Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          <NoteForm addNote={addNote} />
          <NotesGrid notes={notes} deleteNote={deleteNote} />
        </main>
      </div>
    </div>
    )
}
