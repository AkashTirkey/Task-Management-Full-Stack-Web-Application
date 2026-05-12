import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);

  // ADD TASK
  const addTask = () => {
    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };

    setTasks([newTask, ...tasks]);
    setTitle("");
  };

  // DELETE TASK
  const deleteTask = (id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };

  // TOGGLE COMPLETE
  const toggleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    );

    setTasks(updatedTasks);
  };

  // START EDIT
  const startEdit = (task) => {
    setEditingId(task.id);
    setTitle(task.title);
  };

  // UPDATE TASK
  const updateTask = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === editingId ? { ...task, title } : task,
    );

    setTasks(updatedTasks);

    setEditingId(null);
    setTitle("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="max-w-xl mx-auto bg-white p-5 rounded-2xl shadow-lg">
        {/* HEADING */}
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Task Manager
        </h1>

        {/* INPUT + BUTTON */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
          />

          {editingId ? (
            <button
              onClick={updateTask}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 rounded-lg"
            >
              Update
            </button>
          ) : (
            <button
              onClick={addTask}
              className="bg-blue-500 hover:bg-blue-600 text-white px-5 rounded-lg"
            >
              Add
            </button>
          )}
        </div>

        {/* TASKS */}
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <p className="text-center text-gray-400">No tasks added yet</p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="flex justify-between items-center bg-gray-50 border p-3 rounded-xl"
              >
                {/* LEFT */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task.id)}
                  />

                  <p
                    className={`${
                      task.completed
                        ? "line-through text-gray-400"
                        : "text-black"
                    }`}
                  >
                    {task.title}
                  </p>
                </div>

                {/* RIGHT BUTTONS */}
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(task)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
