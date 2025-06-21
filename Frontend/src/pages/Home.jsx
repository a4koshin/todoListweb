import { useState, useEffect } from "react";
import Task from "../components/Task";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [task, setTask] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchDataDB = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("https://todosweb.up.railway.app/todo");
      if (!response.ok) throw new Error("Failed to fetch todos");
      const data = await response.json();
      setTask(data);
      setIsLoading(false);
      setError("");
    } catch (err) {
      setError("Error occurred while fetching data: " + err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDataDB();
  }, []);

  const addTaskHandler = async () => {
    if (!newTask || newTask.trim() === "") return;
    try {
      const res = await fetch("https://todosweb.up.railway.app/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTask }),
      });

      if (res.ok) {
        setNewTask("");
        fetchDataDB();
        setError("");
      } else {
        setError("Failed to add task");
      }
    } catch (err) {
      setError("Error occurred while adding task: " + err.message);
    }
  };

  return (
    <>
      <div className="p-4">
        <div className="font-black text-gray-700 text-4xl mt-10 mb-10 uppercase text-center">
          Your to do
        </div>
        <div className="flex justify-center items-center gap-4 mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter new Task"
            className="px-14 py-2 outline outline-2 outline-gray-400 rounded-md text-left"
          />
          <button
            className="bg-gray-800 text-2xl text-center text-white px-4 py-2 rounded-xl hover:bg-gray-700"
            onClick={addTaskHandler}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>

        {error && (
          <p className="text-center text-red-600 font-semibold mb-4">{error}</p>
        )}

        {isLoading ? (
          <p className="text-center">Loading tasks...</p>
        ) : (
          <div className="mx-auto mt-10">
            <Task tasks={task} fetchData={fetchDataDB} />
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
