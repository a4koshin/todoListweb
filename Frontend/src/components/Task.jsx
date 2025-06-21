import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

const Task = ({ tasks, fetchData }) => {
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");

  // DELETE handler
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8080/todo/${id}`, {
        method: "DELETE",
      });
      fetchData();
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  // UPDATE handler (title + completed)
  const handleUpdate = async (taskId, title, completed) => {
    try {
      await fetch(`http://localhost:8080/todo/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: taskId, title, completed }),
      });
      setEditingId(null);
      setEditedTitle("");
      fetchData();
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  // Toggle checkbox
  const handleToggle = (task) => {
    handleUpdate(task.id, task.title, !task.completed);
  };

  return (
    <div className="flex flex-col gap-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex justify-between items-center p-4 border-2 border-gray-300 rounded-xl shadow-sm"
        >
          {/* Left side: Checkbox, Text or Input, Date */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggle(task)}
            />
            <div>
              {editingId === task.id ? (
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="font-semibold text-gray-800 border-b border-gray-400 outline-none"
                />
              ) : (
                <p
                  className={`font-semibold text-gray-800 ${
                    task.completed ? "line-through" : ""
                  }`}
                >
                  {task.title}
                </p>
              )}
              <span className="text-xs text-gray-400">
                Date: {new Date(task.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Right side: Edit & Delete */}
          <div className="flex items-center gap-4 text-xl">
            {editingId === task.id ? (
              <button
                onClick={() =>
                  handleUpdate(task.id, editedTitle, task.completed)
                }
                className="text-green-600 hover:text-green-800"
              >
                <FontAwesomeIcon icon={faCheck} />
              </button>
            ) : (
              <button
                onClick={() => {
                  setEditingId(task.id);
                  setEditedTitle(task.title);
                }}
                className="text-blue-600 hover:text-blue-800"
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>
            )}
            <button
              onClick={() => handleDelete(task.id)}
              className="text-red-600 hover:text-red-800"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Task;
