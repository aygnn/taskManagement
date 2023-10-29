import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Config/Store";
import MainPage from "./Main Page/MainPage";
import MyClass from "./MyClass/Classwork/MyClass";
import LoginPage from "./Login/LoginPage";
import RegisterPage from "./Register/RegisterPage";
import Edit from "./MyClass/Edit/Edit";
import Profile from "./Profile/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "classwork",
        element: <MyClass />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "edit/:proID",
        element: <Edit />,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
