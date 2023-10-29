import "./Navbarr.scss";
import React, { useEffect, useState } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { BiTask } from "react-icons/bi";

import { toast } from "react-toastify";

export default function Navbarr() {
  const navigate = useNavigate();

  let user = JSON.parse(localStorage.getItem("user"));
  const logoutHandler = () => {
    window.localStorage.removeItem("user");
    window.location.reload();
    navigate("/");
    toast("You are logged out");
  };

  return (
    <div className="main-nav">
      <div className="logo">
        <Link to={"/"}>
          <img src="https://hive.com/wp-content/uploads/2022/05/Colored-Logo.svg" />
        </Link>
      </div>

      <div className="login-panel">
        {user ? (
          <div className="task-navbar">
            <div
              onClick={() => navigate("/classwork")}
              className="task-navbar2"
            >
              <BiTask />
              My Tasks
            </div>
            <div className="user">
              <Link to={"profile"}>
                <FaUserAlt />
              </Link>
              <NavDropdown
                id="nav-dropdown-dark-example"
                title={user.username}
                menuVariant="dark"
              >
                <NavDropdown.Item onClick={logoutHandler}>
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            </div>
          </div>
        ) : (
          <div className="log-sign">
            <div className="login">
              <button>
                <Link to={"login"}>Login</Link>
              </button>
            </div>
            <div className="sign">
              <button>
                <Link to={"register"}>Sign Up</Link>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
