import React from "react";
import ReactTooltip from "react-tooltip";
import { useSelector } from "react-redux";
import "./taskcreate.css";
export const TaskCreateBox = ({ setFormVisState }) => {
  const tasks = useSelector((state) => state.task);
  const allTasks = tasks.tasks;
  return (
    <div className="create-task-box" onClick={() => setFormVisState("block")}>
      <ReactTooltip id="addingTask" type="dark" effect="solid">
        <span>New Task</span>
      </ReactTooltip>
      <div className="box-body">
        <h3 className="heading">
          TASKS <span>{allTasks.length > 0 ? allTasks.length : ""}</span>
        </h3>
      </div>
      <button className="btn-add" data-tip data-for="addingTask">
        +
      </button>
    </div>
  );
};
