import React, { useState } from "react";

export default function NoteForm({ addNote }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("#fef08a");
  const [isRecording, setIsRecording] = useState(false);

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




     // Example of using the Web Speech API for speech recognition

    // const recognition = new window.SpeechRecognition();
    // recognition.onresult = (event) => {
    //     const transcript = event.results[0][0].transcript;
    //     setContent(transcript);
    // };
    // recognition.start();






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
    };

    addNote(newNote);
    setTitle("");
    setContent("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-xl p-4 mb-4 flex flex-col gap-3"
    >
      {/* Title */}
      <input
        type="text"
        placeholder="Title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Content */}
      <textarea
        placeholder="Write a note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border p-2 rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>

      {/* Color Picker + Mic */}
      <div className="flex items-center justify-between">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-10 h-10 cursor-pointer"
        />
        <button
          type="button"
          onClick={handleVoiceInput}
          className={`px-3 py-2 rounded-lg text-white ${
            isRecording ? "bg-red-500 animate-pulse" : "bg-blue-500"
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
  );
}
