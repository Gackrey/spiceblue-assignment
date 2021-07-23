import React, { useState, useEffect, useCallback } from "react";
import { faCalendarAlt, faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import "./taskform.css";
import { useSelector, useDispatch } from "react-redux";
import { addNewTask } from "../../features/Tasks/taskSlice";
import { getAllUsers } from "../../features/Users/userSlice";

export const CreateTaskForm = ({ formVisiState, setFormVisState }) => {
  const dispatch = useDispatch();
  const [desc, setDesc] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [time, setTime] = useState(null);
  const [userID, setUserId] = useState("");
  const users = useSelector((state) => state.user);
  const allUsers = users.users;

  const getData = useCallback(async () => {
    await dispatch(getAllUsers());
  },[dispatch]);

  useEffect(() => {
    if (formVisiState === "block") getData();
  }, [formVisiState, dispatch, getData]);
  function cancelTask() {
    setFormVisState("none");
    setDesc("");
    setUserId("");
    setStartDate(null);
    setTime(null);
  }
  async function addTask() {
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
      await dispatch(addNewTask({ payload: task }));
      cancelTask();
    }
  }

  return (
    <div className="task-form" style={{ display: formVisiState }}>
      <form>
        <div>
          <label>
            <span>Task Description</span>
            <input
              type="text"
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
                Choose....
              </option>
              {allUsers.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
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
            onClick={addTask}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

