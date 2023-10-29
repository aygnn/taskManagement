import React, { useEffect, useState } from "react";
import "./MyClass.scss";
import { AiOutlineUserAdd } from "react-icons/ai";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { deleteTask } from "../../Config/UserSlice";
import { MdDelete } from "react-icons/md";
export default function MyClass() {
  const navigate = useNavigate();
  let TASKS = JSON.parse(localStorage.getItem("Tasks"));
  let Added = JSON.parse(localStorage.getItem("Added"));

  const dispatch = useDispatch();

  const handleDeleteTask = (item) => {
    dispatch(deleteTask(item));
  };

  const formatShortDate = (dateString) => {
    const options = {
      day: "numeric",
      year: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return new Date(dateString).toLocaleString("en-US", options);
  };
  let user = JSON.parse(localStorage.getItem("user"));

  const handleDetail = (id) => {
    navigate(`/edit/${id}`);
    console.log("hello");
  };

  return (
    <div className="tasks">
      {TASKS && TASKS.length > 0 ? (
        <div className="myTask">
          <div className="like">
            {TASKS.map((item) => (
              <div className="task" key={item.id}>
                <div className="up">
                  <div className="task-title">
                    <h3>{item.title}</h3>
                  </div>
                  <div className="author">{user?.username}</div>
                </div>

                <div className="sector_2">
                  <div className="auth">
                    <img src="https://lh3.googleusercontent.com/a/default-user=s75-c" />
                  </div>
                  <p>{item.description}</p>
                </div>

                <div className="sector_3">
                  <div className="dead">{formatShortDate(item.date)}</div>
                  <div className="acsess">
                    <div
                      className="icon-del"
                      onClick={() => handleDeleteTask(item)}
                    >
                      <MdDelete />
                    </div>
                    {Added ? Added.length : 0} People{" "}
                    <div onClick={() => handleDetail(item.id)}>
                      <AiOutlineUserAdd />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="make">
            <button onClick={() => navigate(-1)} className="button-5">
              Create Class
            </button>
          </div>
        </div>
      ) : (
        <div className="no_task">
          <h2 className="blink">You have no tasks</h2>
          <Stack spacing={2} direction="row">
            <Button variant="outlined" onClick={() => navigate("/")}>
              Go Back
            </Button>
          </Stack>
        </div>
      )}
    </div>
  );
}
