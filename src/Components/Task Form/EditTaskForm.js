import React, { useState, useEffect, useCallback } from "react";
import { faCalendarAlt, faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import "./taskform.css";
import { useSelector, useDispatch } from "react-redux";
import { updateTask, deleteTask } from "../../features/Tasks/taskSlice";
import { getAllUsers } from "../../features/Users/userSlice";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export const EditTaskForm = ({ formEditState, setFormEditState }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
  const tasks = useSelector((state) => state.task);
  const taskToEdit = tasks.taskToEdit;
  const [desc, setDesc] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [time, setTime] = useState(null);
  const [userID, setUserId] = useState("");
  const [selectedUser, setUser] = useState("");
  const allUsers = users.users;
  console.log(taskToEdit);
  console.log(allUsers);
  const getData = useCallback(async () => {
    await dispatch(getAllUsers());
  }, [dispatch]);
  useEffect(() => {
    if (formEditState === "block") getData();
  }, [formEditState, dispatch, getData]);

  useEffect(() => {
    if (taskToEdit.task_msg && allUsers.length > 0) {
      // Processing time to make it in date format
      let tempDate = new Date();
      let ts = taskToEdit.task_time % 60;
      let tm = (taskToEdit.task_time / 60) % 60;
      let th = (taskToEdit.task_time / 3600) % 60;
      tempDate.setHours(parseInt(th), parseInt(tm), parseInt(ts));

      // Processing user to get assigned username
      const assigned_user = allUsers.find(
        (item) => item.user_id === taskToEdit.user_id
      );
      // Filling all the fields
      setDesc(taskToEdit.task_msg);
      setStartDate(new Date(taskToEdit.task_date));
      setTime(tempDate);
      setUser(assigned_user.name);
    }
  }, [allUsers, taskToEdit]);

  function cancelTask() {
    setFormEditState("none");
    setDesc("");
    setUserId("");
    setStartDate(null);
    setTime(null);
  }
  async function updateTaskHandler() {
    if (userID.length > 0 && desc.length > 0 && startDate && time) {
      const timeInSeconds =
        time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds();
      const task = {
        assigned_user: userID,
        task_date: moment(startDate).format("YYYY-MM-DD"),
        task_time: timeInSeconds,
        is_completed: 0,
        time_zone: startDate.getTimezoneOffset() * -60,
        task_msg: desc,
      };
      await dispatch(updateTask({ payload: task, task_id: taskToEdit.id }));
      cancelTask();
    }
  }
  async function deleteTaskHandler() {
    await dispatch(deleteTask({ task_id: taskToEdit.id }));
    cancelTask();
  }

  return (
    <div className="task-form" style={{ display: formEditState }}>
      <form>
        <div>
          <label>
            <span>Task Description</span>
            <input
              type="text"
              value={desc}
              className="inp"
              onChange={(e) => setDesc(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="date-time">
          <label>
            <span>Date</span>
            <div className="date-box">
              <div className="date-box-icon-wrapper">
                <FontAwesomeIcon icon={faCalendarAlt} />
              </div>
              <DatePicker
                value={startDate}
                className="inp-date-time"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
          </label>
          <label>
            <span>Time</span>
            <div className="date-box">
              <div className="date-box-icon-wrapper">
                <FontAwesomeIcon icon={faClock} />
              </div>
              <DatePicker
                value={time}
                selected={time}
                onChange={(date) => setTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
            </div>
          </label>
        </div>
        <div>
          <label>
            <span>Assign User</span>
            <select
              className="select"
              onChange={(e) => {
                setUserId(e.target.value);
              }}
            >
              <option key="asd" hidden>
                {selectedUser}
              </option>
              {allUsers.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="form-footer">
          <div>
            <button
              type="button"
              className="btn-delete"
              onClick={deleteTaskHandler}
            >
              <FontAwesomeIcon icon={faTrashAlt} className="delete-svg" />
            </button>
          </div>
          <div className="btns">
            <button
              type="button"
              className="btn-add-rem btn-cancel"
              onClick={cancelTask}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn-add-rem btn-save"
              onClick={updateTaskHandler}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
