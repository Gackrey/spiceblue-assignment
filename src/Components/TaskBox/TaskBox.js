import ReactTooltip from "react-tooltip";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faCheck, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { setTaskToEdit } from "../../features/Tasks/taskSlice";
import "./taskbox.css";
import React from "react";
export const TaskBox = ({ desc, date, setFormEditState, task }) => {
  const dispatch = useDispatch();
  return (
    <div className="taskbox">
      <div className="desc">
        <img
          src="https://cdn.iconscout.com/icon/free/png-512/laptop-user-1-1179329.png"
          alt="logo"
          className="logo"
        />
        <div className="task-info">
          <h4>{desc}</h4>
          <p>{date}</p>
        </div>
      </div>
      <div className="e-btns">
        <ReactTooltip id="editingTask" type="dark" effect="solid">
          <span>Edit Task</span>
        </ReactTooltip>
        <button
          className="btn-edit"
          data-tip
          data-for="editingTask"
          onClick={() => {
            setFormEditState("block");
            dispatch(setTaskToEdit(task));
          }}
        >
          <FontAwesomeIcon icon={faPen} />
        </button>
        <div>
          <ReactTooltip id="snoozeTask" type="dark" effect="solid">
            <span>Snooze Task</span>
          </ReactTooltip>
          <button className="btn-snooze" data-tip data-for="snoozeTask">
            <FontAwesomeIcon icon={faBell} />
          </button>
          <ReactTooltip id="doneTask" type="dark" effect="solid">
            <span>Done Task</span>
          </ReactTooltip>
          <button className="btn-tick" data-tip data-for="doneTask">
            <FontAwesomeIcon icon={faCheck} />
          </button>
        </div>
      </div>
    </div>
  );
};
