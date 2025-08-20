import React from "react";
import { motion } from "framer-motion";

export default function Note({ id, title, content, color, date, deleteNote, pinned }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className={`rounded-xl shadow-md p-4 mb-4 break-words relative`}
      style={{ backgroundColor: color || "#fef3c7" }}
    >
      {/* Pin Badge */}
      {pinned && (
        <span className="absolute top-2 right-2 bg-indigo-500 text-white text-xs px-2 py-1 rounded-md">
          📌 Pinned
        </span>
      )}

      {/* Title */}
      {title && (
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
          {title}
        </h2>
      )}

      {/* Content */}
      <p className="text-sm text-gray-700 dark:text-gray-200 mb-4 whitespace-pre-wrap">
        {content}
      </p>

      {/* Footer */}
      <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
        <span>{date || new Date().toLocaleDateString()}</span>
        <button
          onClick={() => deleteNote(id)}
          className="px-2 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </motion.div>
  );
}
