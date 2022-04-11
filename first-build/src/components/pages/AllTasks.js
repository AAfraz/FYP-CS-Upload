import Axios from "axios";
import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Backdrop from "../generic/Backdrop";
import CardArea from "../generic/CardArea";
import AddTask from "../popups/AddTask";
import "./AllTasks.css";

function AllTasks() {
  const [isLoading, setIsLoading] = useState(true); // State for loading status of tasks
  const [loadedTasks, setLoadedTasks] = useState([]); // State for tasks to be loaded into
  const [addTaskIsOpen, setAddTaskIsOpen] = useState(false); // State for AddTask Popup

  var projectId = sessionStorage.getItem("projectId");
  console.log("Project ID is: "+projectId);

  // Loading the tasks from the database
  useEffect(() => {
    setIsLoading(true);
    Axios.get("/api/tasks") // Using projectId to make query - Do this
      .then((response) => {
        const tasks = [];
        console.log(response); // Logging the response to check what data is retrieved

        for (const id in response.data) {
          const item = {
            ...response.data[id],
          };

          tasks.push(item);
        }

        setIsLoading(false);
        setLoadedTasks(tasks);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  // Displaying loading message while tasks are loading from database
  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  function addTaskHandler() {
    setAddTaskIsOpen(true); // Sets State to true and reloads component
  }

  function closePopupHandler() {
    setAddTaskIsOpen(false);
  }

  return (
    <section>
      <header className="alltasks-header">
        <h1>All Tasks</h1>
        <div className="button-container">
          <button type="button" className="add-task" onClick={addTaskHandler}>
            + Add Task
          </button>
        </div>
      </header>
      <CardArea data={loadedTasks} type="task" />
      {/* When state is true, Popup and Backdrop are displayed */}
      {addTaskIsOpen && (
        <AddTask onCancel={closePopupHandler} onConfirm={closePopupHandler} />
      )}
      {addTaskIsOpen && <Backdrop onClick={closePopupHandler} />}
    </section>
  );
}

export default AllTasks;
