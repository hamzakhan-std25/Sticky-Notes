import React, { useEffect, useState } from 'react';
import NotesGrid from './NotesGrid';
import { div } from 'framer-motion/client';
import Sidebar from './Sidebar';
import { FiPlus } from 'react-icons/fi';
import NoteForm from './NoteForm';


export default function Home() {

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);



    const [notes, setNotes] = useState(() => {

        try {
            const savedNotes = localStorage.getItem("notes");
            return savedNotes ? JSON.parse(savedNotes) : [];

        } catch (error) {
            console.error("Error loading notes from localStorage:", error);
            return [];
        }
    });


    useEffect(() => {
        console.log("Saving notes to localStorage:", notes);
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

    // const changePined = (id) => {
    //     setNotes((prevNotes) => prevNotes.filter((note) => {
    //         if (note.id == id) {
    //             return { ...note, pinned: !note.pinned };
    //         }
    //         return note;
    //     }));
    // };


    const toggleForm = () => {
        setIsSideBarOpen(false); // Close sidebar when form is opened
        setIsFormOpen(!isFormOpen);
    }

    return (
        <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">

            <Sidebar isOpen={isSideBarOpen} setIsOpen={setIsSideBarOpen} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top Bar */}
                <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md">
                    <h1 className="text-xl font-bold">My Sticky Notes</h1>
                    <button onClick={toggleForm}
                        className="px-3 py-1 rounded-md bg-indigo-500 text-white hover:bg-indigo-600 transition"
                    >
                        Add Note <FiPlus className=' inline text-2xl ml-2' />
                    </button>
                </header>

                Notes Area
                <main className="flex-1 p-6 overflow-y-auto">
                    <NotesGrid notes={notes} deleteNote={deleteNote} />
                </main>
            </div>
            {/* Floating Action Button */}
            <div
                onClick={toggleForm}
                className="fixed bottom-4 right-4">
                <button
                    className="bg-indigo-500 text-white p-3 rounded-full shadow-lg hover:bg-indigo-600 transition"
                >
                    <FiPlus className="text-2xl" />
                </button>
            </div>
            {isFormOpen &&
                <div onClick={toggleForm} className='fixed bottom-0 right-0 left-0 top-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 '>
                    <NoteForm
                        addNote={addNote}
                        toggleForm={toggleForm}
                    />
                </div>
            }


        </div>
    )
}
