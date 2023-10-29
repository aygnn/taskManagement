import { Container } from "react-bootstrap";
import "./Login.scss";
import { FaHome } from "react-icons/fa";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { Icon } from "react-icons-kit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

const Loginn = Yup.object().shape({
  username: Yup.string().required("Please entered username"),
  password: Yup.string().required("Please entered the Correct password!"),
});

export default function LoginPage() {
  const [users, setUsers] = useState([]);
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  const USERS = useSelector((state) => state.useritem.users);
  let user = JSON.parse(localStorage.getItem("users"));

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };
  const navigate = useNavigate();
  return (
    <div className="login">
      <Helmet>
        <title>Login Page</title>
      </Helmet>
      <ToastContainer />

      <div className="top">
        <Container>
          <div className="text">
            <Link to={"/"}>
              <FaHome /> Home
            </Link>
            <span>Login</span>
          </div>
        </Container>
      </div>

      <div className="login-section">
        <Container>
          <div className="login-form">
            <h2>Login</h2>

            <div>
              <Formik
                initialValues={{
                  username: "",
                  password: "",
                }}
                validateOnBlur={false}
                validateOnChange={false}
                validationSchema={Loginn}
                onSubmit={async (values) => {
                  console.log(user);
                  if (!user) {
                    toast.error("User not found!", {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                    });
                  } else {
                    const foundUser = user.find(
                      (element) =>
                        element.username === values.username &&
                        element.password === values.password
                    );

                    if (foundUser) {
                      localStorage.setItem("user", JSON.stringify(foundUser));
                      sessionStorage.setItem("userlogin", JSON.stringify(true));
                      navigate("/");
                      window.location.reload();
                      console.log("element", foundUser);
                    } else {
                      toast.error("User not found!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                      });
                    }
                  }
                }}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className="input">
                      <label>Username *</label>
                      <div className="input-username">
                        <Field
                          className="username"
                          name="username"
                          style={
                            errors.username &&
                            touched.username && { borderColor: "red" }
                          }
                        />
                      </div>
                    </div>
                    {errors.username && touched.username && (
                      <div
                        style={
                          errors.username &&
                          touched.username && {
                            fontSize: "17px",
                            color: "red",
                            marginTop: "-20px",
                          }
                        }
                      >
                        {errors.username}
                      </div>
                    )}

                    <div className="input">
                      <label>Password *</label>
                      <div
                        className="inputpassword"
                        style={
                          errors.password &&
                          touched.password && { borderColor: "red" }
                        }
                      >
                        <Field
                          className="password"
                          name="password"
                          type={type}
                        />
                        <span onClick={handleToggle}>
                          <Icon icon={icon} size={20} />
                        </span>
                      </div>
                    </div>
                    {errors.password && touched.password && (
                      <div
                        style={
                          errors.password &&
                          touched.password && {
                            fontSize: "17px",
                            color: "red",
                            marginTop: "-20px",
                          }
                        }
                      >
                        {errors.password}
                      </div>
                    )}
                    <button type="submit">Sign In</button>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="switch-login">
              <Link to={"/register"}> Or Create An Account</Link>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
