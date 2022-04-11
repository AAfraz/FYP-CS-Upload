import "./Card.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Card(props) {
  const [itemId, setItemId] = useState(""); // State for storing ID of card

  // Identifying the ID of the item depending on the type
  function determineId() {
    if (props.type == "project") {
      console.log(props.itemData["ProjectID"]);
      setItemId(props.itemData["ProjectID"]);
      sessionStorage.setItem("projectId" , itemId);
    } else {
      console.log(props.itemData["TaskID"]);
      setItemId(props.itemData["TaskID"]);
    }
  }

  if (props.type == "project") {
    // If card represents a Project
    return (
      <div>
        <Link
          to={{
            pathname: "/alltasks",
            state: { projectId: itemId }, // Sending projectId to "alltasks" page
          }}
          style={{ textDecoration: "none" }} // Removes the underlining CSS which was added due to item being a link
        >
          <div className="card task-card" onClick={determineId}>
            <h2>{props.title}</h2>
            <div className="task-details">
              <h3 className="status">{props.status}</h3>
              <h3 className="due">Due: {props.due}</h3>
            </div>
          </div>
        </Link>
      </div>
    );
  } else {
    // Else card represents a Task
    console.log("Tasks represented");
    return (
      <div>
        <Link
          to={{
            pathname: "/alltasks",
            state: { projectId: itemId },
          }}
          style={{ textDecoration: "none" }}
        >
          <div className="card task-card" onClick={determineId}>
            <h2>{props.title}</h2>
            <div className="task-details">
              <h3 className="status">{props.status}</h3>
              <h3 className="due">Due: {props.due}</h3>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default Card;
