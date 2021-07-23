import React, { useState, useEffect } from "react";
import {
  TaskCreateBox,
  CreateTaskForm,
  EditTaskForm,
  TaskBox,
} from "../../Components";
import { useSelector, useDispatch } from "react-redux";
import { getAllTasks } from "../../features/Tasks/taskSlice";
import "./Task.css";
export const Task = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task);
  const allTasks = tasks.tasks;

  useEffect(() => {
    (async function () {
      await dispatch(getAllTasks());
    })();
  }, [dispatch]);
  
  const [formVisiState, setFormVisState] = useState("none");
  const [formEditState, setFormEditState] = useState("none");
  return (
    <div>
      <TaskCreateBox setFormVisState={setFormVisState} />
      <CreateTaskForm
        formVisiState={formVisiState}
        setFormVisState={setFormVisState}
      />
      <EditTaskForm
        formEditState={formEditState}
        setFormEditState={setFormEditState}
      />
      <div
        className="task-wrapper"
        style={{
          display:
            formVisiState === "none" && formEditState === "none"
              ? "block"
              : "none",
        }}
      >
        {allTasks.map((item) => (
          <TaskBox
            key={item.id}
            task={item}
            desc={item.task_msg}
            date={item.task_date}
            setFormEditState={setFormEditState}
          />
        ))}
      </div>
    </div>
  );
};
