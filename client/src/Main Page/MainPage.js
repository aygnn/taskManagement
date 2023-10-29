import "./MainPage.scss";
import { Helmet } from "react-helmet";
import React, { useState } from "react";
// import Form from 'react-bootstrap/For m';
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { BsCalendarDate } from "react-icons/bs";
import { setHours, setMinutes } from "date-fns";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { handleTasks } from "../Config/UserSlice";
import { useDispatch, useSelector } from "react-redux";

const createTask = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});

export default function MainPage() {
  const dispatch = useDispatch();
  const TASKS = useSelector((state) => state.useritem.tasks);

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(setHours(setMinutes(new Date(), 30), 16));

  const handleCreate = () => {
    let user = JSON.parse(localStorage.getItem("user"));

    if (user === null) {
      alert("You must login first!");
      navigate("/login");
    } else {
      setIsOpen(!isOpen);
    }
  };
  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Helmet>
        <title>Home Page</title>
      </Helmet>

      <div className="home-page">
        <div className="img">
          <img src="https://www.gstatic.com/classroom/empty_states_home.svg" />
        </div>

        <div className="adding">
          <p>Add a class to get started</p>
          <div>
            <button onClick={handleCreate} className="button-5">
              Create Class
            </button>
            {isOpen && (
              <div className="class-card">
                <div className="title">Create Task</div>
                <Formik
                  initialValues={{
                    title: "",
                    description: "",
                    date: "",
                  }}
                  validationSchema={createTask}
                  validateOnBlur={false}
                  validateOnChange={false}
                  onSubmit={async (values) => {
                    dispatch(
                      handleTasks({
                        title: values.title,
                        description: values.description,
                        date: date.toISOString(),
                      })
                    );

                    console.log(TASKS);
                    navigate("classwork");
                    window.location.reload();
                  }}
                >
                  {({ errors, touched }) => (
                    <Form className="from">
                      <div className="inputs">
                        <Field
                          as={TextField}
                          label="Task title"
                          name="title"
                          variant="outlined"
                        />
                        {errors.title && touched.title && (
                          <div style={{ color: "red", fontSize: "16px" }}>
                            {errors.title}
                          </div>
                        )}

                        <Field
                          as={TextField}
                          label="Task description"
                          name="description"
                          variant="outlined"
                        />
                        {errors.description && touched.description && (
                          <div style={{ color: "red", fontSize: "16px" }}>
                            {errors.description}
                          </div>
                        )}

                        <div className="dates">
                          <div className="date-icon">
                            <BsCalendarDate />
                            <p>Set a deadline</p>
                          </div>
                          <DatePicker
                            className="vaxt"
                            name="date"
                            selected={date}
                            onChange={(newDate) => setDate(newDate)}
                            showTimeSelect
                            excludeTimes={[
                              setHours(setMinutes(new Date(), 0), 17),
                              setHours(setMinutes(new Date(), 30), 18),
                              setHours(setMinutes(new Date(), 30), 19),
                              setHours(setMinutes(new Date(), 30), 17),
                            ]}
                            dateFormat="MMMM d, yyyy h:mm aa"
                          />
                        </div>
                        <div className="cancel-create">
                          <Stack spacing={2} direction="row">
                            <Button variant="text" onClick={handleCancel}>
                              Cancel
                            </Button>
                            <Button type="submit" variant="contained">
                              Create
                            </Button>
                          </Stack>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
