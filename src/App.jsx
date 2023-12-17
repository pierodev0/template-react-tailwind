import { useState } from "react";
import "./index.css";
import { nanoid } from "nanoid";

let listArray = [
  {
    id: nanoid(),
    name: "Create a videogame",
    completed: false,
  },
  {
    id: nanoid(),
    name: "Learn a new programming language",
    completed: true,
  },
  {
    id: nanoid(),
    name: "Write a book",
    completed: false,
  },
  {
    id: nanoid(),
    name: "Start a blog",
    finished: true,
  },
];

export default function App() {
  const [taskArray, setTaskArray] = useState(listArray);

  function handleAddTask(task) {
    setTaskArray((tasks) => [...tasks, task]);
  }

  function handleToggleTask(task) {
    if (task.completed === false) {
      setTaskArray((oldTasks) =>
        oldTasks.map((oldTask) =>
          oldTask.id === task.id
            ? { ...oldTask, completed: !oldTask.completed }
            : oldTask
        )
      );
    }

    if (task.completed === true) {
      setTaskArray((oldTasks) =>
        oldTasks.filter((oldTask) => oldTask.id !== task.id)
      );
    }
  }
  return (
    <div className="p-4">
      <Head onAddTask={handleAddTask} />
      <TodoList taskArray={taskArray} onToggleTask={handleToggleTask} />
    </div>
  );
}

function Head({ onAddTask }) {
  const [task, setTask] = useState("");
  function handleChange(e) {
    setTask(e.target.value);
  }
  function handleKeyDown(e) {
    if (!task) return;

    if (e.key === "Enter") {
      const newTask = {
        id: nanoid(),
        name: task,
        completed: false,
      };
      onAddTask(newTask);
      setTask("");
    }
  }
  return (
    <div className="bg-gray-300 p-2">
      <label htmlFor="">Add Todo</label>
      <input
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={task}
      />
    </div>
  );
}
function TodoList({ taskArray, onToggleTask }) {
  const tasksToDo = taskArray.filter((task) => task.completed === false);
  const completedTasks = taskArray.filter((task) => task.completed === true);
  return (
    <>
      <div className="grid grid-cols-2">
        <div className="">
          <h2 className="text-xl font-bold">Por hacer</h2>
          <ListTask taskArray={tasksToDo} onToggleTask={onToggleTask} />
        </div>
        <div className="">
          <h2 className="text-xl font-bold">Finalizadas</h2>
          <ListTask taskArray={completedTasks} onToggleTask={onToggleTask} />
        </div>
      </div>
    </>
  );
}

function ListTask({ taskArray, onToggleTask }) {
  return (
    <ul className="">
      {taskArray.length === 0 ? (
        <p className="italic text-gray-400">No hay tareas por hacer</p>
      ) : (
        taskArray?.map((task) => (
          <Task key={task.id} task={task} onToggleTask={onToggleTask} />
        ))
      )}
    </ul>
  );
}

function Task({ task, onToggleTask }) {
  return (
    <div className="flex gap-2 items-center">
      <li className="p-1">{task.name}</li>
      <Button task={task} onClick={() => onToggleTask(task)} />
    </div>
  );
}

function Button({ onClick, task }) {
  const isCompleted = task.completed;
  return (
    <button
      onClick={onClick}
      className={`${
        isCompleted ? "bg-red-200" : "bg-green-200"
      } flex items-center justify-center w-7 h-7 rounded-full font-bold text-white leading-[12px] text-sm`}
    >
      {isCompleted ? "❌" : "✔"}
    </button>
  );
}
