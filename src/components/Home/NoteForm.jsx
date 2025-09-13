import { div } from "framer-motion/client";
import React, { useState } from "react";

export default function NoteForm({ addNote, toggleForm }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("#fef08a");
  const [isRecording, setIsRecording] = useState(false);




  const [pinned, setPinned] = useState(true);




  const togglePined = () => {
    setPinned(!pinned);
  }

  let recognition;

  // Voice-to-Text Functionality
  const handleVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    if (!recognition) {
      recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setContent((prev) => prev + " " + transcript);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };
    }

    recognition.start();
  };





  // Add Note
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "" && content.trim() === "") return;

    const newNote = {
      id: Date.now(),
      title,
      content,
      color,
      date: new Date().toLocaleString(),
      pinned: pinned, // Default to not pinned
    };

    addNote(newNote);

    setTitle("");
    setContent("");
    setIsRecording(false); // Stop recording after adding note
    if (recognition) {
      recognition.stop(); // Stop recognition if it was active
    }
    // Close the form after adding a note
    toggleForm();
  };

  return (
    <div onClick={
      (e) => {
        e.stopPropagation(); // Prevent click from closing the form
      }
    } className="w-[90vw] h-[90vh]  overflow-y-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl transition-opacity duration-700 
     ">
      <form
        onSubmit={handleSubmit}
        className="dark:bg-gray-600  shadow-md rounded-xl p-4 mb-4 flex flex-col gap-3"
      >

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            {title ? "Edit Note" : "Add New Note"}
          </h2>
          <button
            type="button"
            onClick={toggleForm}
            className="text-gray-500 dark:text-white hover:text-gray-700 transition rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer hover:bg-gray-300"
          >
            ❌ Close
          </button>
        </div>
        {/* Title */}
        <div className="flex items-center justify-between gap-8">
          <input
            type="text"
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-500 w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
          />
          <div
            onClick={togglePined}
            className={`${pinned ? ' bg-green-400 hover:bg-blue-600 ' : ' bg-gray-400 hover:bg-blue-600'} p-2 rounded-xl border border-gray-400 px-4 cursor-pointer  transition-colors shrink-0 `}>
            {pinned ? "📌 Pinned" : "📍 Pin Note"}
            {/* Tooltip */}
          </div>
        </div>

        {/* Content */}
        <textarea
          placeholder="Write a note..."
          value={content}
          required
          onChange={(e) => setContent(e.target.value)}
          className="border border-gray-500 p-2 rounded-lg min-h-54 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
        ></textarea>

        {/* Color Picker + Mic */}
        <div className="flex items-center justify-between">
          <div className=" flex justify-center items-center"><input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-10 h-10 cursor-pointer mr-4"
          /> 
            <span className="text-gray-500 dark:text-gray-400">Select Color</span>
          </div>
          <button
            type="button"
            onClick={handleVoiceInput}
            className={` cursor-pointer hover:bg-blue-600 transition-colors px-3 py-2 rounded-lg text-white ${isRecording ? "bg-red-500 animate-pulse" : "bg-blue-500"
              }`}
          >
            🎤 {isRecording ? "Listening..." : "Speak"}
          </button>
        </div>

        {/* Add Button */}
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Add Note
        </button>
      </form>
    </div>
  );
}
