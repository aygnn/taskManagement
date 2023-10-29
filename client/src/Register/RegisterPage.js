import { Helmet } from "react-helmet";

import { Container } from "react-bootstrap";
import "./Register.scss";
import { FaHome } from "react-icons/fa";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import { object, string, ref } from "yup";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { Icon } from "react-icons-kit";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { handleRegister } from "../Config/UserSlice";

import axios from "axios";

const Login = Yup.object().shape({
  email: Yup.string()
    .required("Please entered email")
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please entered correct email or username!"
    ),

  username: Yup.string().required("Please entered username"),
  password: Yup.string()
    .required("Please entered password")
    .matches(
      /^[a-zA-Z0-9]{6,}$/,
      "Password must be at least 6 alphanumeric characters"
    ),
  companyName: Yup.string().required("Please entered username"),

  phone: Yup.number().required("Please entered username"),
  adress: Yup.string().required("Please entered username"),
});

export default function RegisterPage() {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const USERS = useSelector((state) => state.useritem.users);
  const dispatch = useDispatch();
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
  console.log(USERS);

  return (
    <div className="register">
      <Helmet>
        <title>Register Page</title>
      </Helmet>
      <ToastContainer />

      <div className="top">
        <Container>
          <div className="text">
            <Link to={"/"}>
              <FaHome /> Home
            </Link>
            <span>Register</span>
          </div>
        </Container>
      </div>

      <div className="login-section">
        <Container>
          <div className="login-form">
            <h2>Register</h2>

            <Formik
              initialValues={{
                email: "",
                username: "",
                password: "",
                companyName: "",
                phone: 0,
                adress: "",
              }}
              validationSchema={Login}
              validateOnBlur={false}
              validateOnChange={false}
              onSubmit={async (values, { resetForm }) => {
                dispatch(handleRegister(values));
                resetForm();
                toast.success("You are already have account!", {
                  position: "top-right",
                  autoClose: 2400,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
                navigate("/login");
                window.location.reload();
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="input">
                    <label>Email address *</label>
                    <Field
                      className="username"
                      name="email"
                      style={
                        errors.email && touched.email
                          ? { borderColor: "red" }
                          : {}
                      }
                    />
                  </div>

                  <div className="input">
                    <label>Username *</label>
                    <Field
                      className="username"
                      name="username"
                      style={
                        errors.username && touched.username
                          ? { borderColor: "red" }
                          : {}
                      }
                    />
                  </div>
                  <div className="passwords">
                    <div className="input">
                      <label>Password *</label>
                      <div
                        className="inputpassword"
                        style={
                          errors.password && touched.password
                            ? { borderColor: "red" }
                            : {}
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
                            marginTop: "91px",
                            color: "red",
                            position: "absolute",
                          }
                        }
                      >
                        {errors.password}
                      </div>
                    )}

                    <div className="input">
                      <label>Phone Number</label>
                      <Field
                        className="phone"
                        name="phone"
                        style={
                          errors.phone && touched.phone
                            ? { borderColor: "red" }
                            : {}
                        }
                      />
                    </div>
                  </div>
                  <div className="passwords">
                    <div className="input">
                      <label>Company Name</label>
                      <Field
                        className="companyName"
                        name="companyName"
                        style={
                          errors.companyName && touched.companyName
                            ? { borderColor: "red" }
                            : {}
                        }
                      />
                    </div>

                    <div className="input">
                      <label>Adress</label>
                      <Field
                        className="adress"
                        name="adress"
                        style={
                          errors.adress && touched.adress
                            ? { borderColor: "red" }
                            : {}
                        }
                      />
                    </div>
                  </div>

                  <button type="submit">Sign In</button>
                </Form>
              )}
            </Formik>
            <div className="switch-login">
              <Link to={"/login"}> Or Login</Link>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
