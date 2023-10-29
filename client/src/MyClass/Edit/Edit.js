import axios from "axios";
import "./Edit.scss";
import { VscCopy } from "react-icons/vsc";
import React, { useEffect, useState } from "react";
import { AiOutlineUserAdd, AiOutlinePlus } from "react-icons/ai";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, handleUserAdd } from "../../Config/UserSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDelete } from "react-icons/md";

export default function Edit() {
  let user = JSON.parse(localStorage.getItem("user"));
  let TASKS = JSON.parse(localStorage.getItem("Tasks"));
  let Added = JSON.parse(localStorage.getItem("Added"));

  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://fashi-virid.vercel.app/users")
      .then((res) => setUsers(res.data));
  }, []);

  let { proID } = useParams();
  const selectedItem = TASKS.find((item) => item.id === proID);

  const handleAdd = () => {
    setIsOpen(!isOpen);
  };
  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleUser = (item) => {
    dispatch(handleUserAdd(item));
  };
  const handledeleteUser = (item) => {
    dispatch(deleteUser(item));
  };

  return (
    <div className="editPage">
      <ToastContainer />
      <div className="teacher">
        <div className="admin">
          <h2>Admin</h2>
          <div className="taskName">
            <h2>{selectedItem.title}</h2>
          </div>
        </div>

        <div className="admin_name">
          <img src="https://lh3.googleusercontent.com/a/default-user=s32-c" />
          <p>{user.username}</p>
        </div>
      </div>
      <div className="users">
        <div className="students">
          <div className="basliq">
            <h2>Students</h2>
          </div>

          <div onClick={handleAdd} className="add">
            <Stack spacing={2} direction="row">
              <Button variant="text">
                <AiOutlineUserAdd />
              </Button>
            </Stack>
          </div>

          {isOpen && (
            <div className="class-card">
              <div>
                <div className="title">Add User</div>

                <div className="user_link">
                  <p>Invite Link</p>
                  <div>
                    https://classroom.google.com/c/NjM0NzcyOTcxNjk0?cjc=3gjdull{" "}
                    <VscCopy />
                  </div>
                </div>
              </div>

              <div className="invites">
                <p>Users</p>
                <div className="collabs">
                  {users.map((item) => (
                    <div className="collab" key={item._id}>
                      <div className="collab_name">{item.username}</div>

                      <div className="add_icon">
                        <Stack spacing={2} direction="row">
                          <Button
                            variant="text"
                            onClick={() => {
                              handleUser(item);
                            }}
                          >
                            <AiOutlinePlus />
                          </Button>
                        </Stack>
                      </div>
                    </div>
                  ))}
                </div>
                <Stack className="stack" spacing={2} direction="row">
                  <Button variant="text" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCancel}
                    type="submit"
                    variant="contained"
                  >
                    Save
                  </Button>
                </Stack>
              </div>
            </div>
          )}
        </div>

        <div className="lists">
          {Added && Added.length > 0 ? (
            Added.map((item) => (
              <div className="admin_name" key={item._id}>
                <div className="adlar">
                  <img src="https://lh3.googleusercontent.com/a/default-user=s32-c" />
                  <p>{item.username}</p>
                </div>

                <div
                  className="icon-del"
                  onClick={() => handledeleteUser(item)}
                >
                  <MdDelete />
                </div>
              </div>
            ))
          ) : (
            <div></div>
          )}
        </div>
      </div>

      <div className="back">
        <Stack spacing={2} direction="row">
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </Stack>
      </div>
    </div>
  );
}
