import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
let TASKS = JSON.parse(localStorage.getItem("Tasks"));
let Added = JSON.parse(localStorage.getItem("Added"));

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  status: null,
  value: Added? Added :[],
  usercount: 0,
  users: [],
  tasks: TASKS ? TASKS : [],
};

const UserSlice = createSlice({
  name: "useritem",
  initialState,
  reducers: {
    handleUserAdd: (state, action) => {
      if (state.value.find((x) => x._id === action.payload._id)) {
        toast.error("Already added this User!", {
          position: "top-right",
          autoClose: 2400,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        const newUser = { ...action.payload };
        state.value.push(newUser);
        state.usercount = state.usercount + 1;
      }

      localStorage.setItem(
        "Added",
        JSON.stringify(state.value, state.usercount)
      );
    },

    handleRegister: (state, action) => {
      const uniqueId = uuidv4();

      const newUser = { ...action.payload, id: uniqueId };
      state.users.push(newUser);

      const usersInLocalStorage =
        JSON.parse(localStorage.getItem("users")) || [];
      usersInLocalStorage.push(newUser);
      localStorage.setItem("users", JSON.stringify(usersInLocalStorage));
    },

    handleTasks: (state, action) => {
      const uniqueId = uuidv4();

      const newTask = { ...action.payload, id: uniqueId };
      state.tasks.push(newTask);

      const localTasks = JSON.parse(localStorage.getItem("Tasks")) || [];
      localTasks.push(newTask);
      localStorage.setItem("Tasks", JSON.stringify(localTasks));
      console.log(state.tasks);
    },

    deleteTask: (state, actions) => {
      const filteredTasks = state.tasks.filter(
        (task) => task.id !== actions.payload.id
      );
      state.tasks = filteredTasks;
      localStorage.setItem("Tasks", JSON.stringify(filteredTasks));
      window.location.reload();
    },

    deleteUser: (state, actions) => {
      console.log(state.value);
      const filteredTasks = state.value.filter(
        (task) => task._id !== actions.payload._id
      );
      state.value = filteredTasks;
      localStorage.setItem("Added", JSON.stringify(filteredTasks));
      // window.location.reload();
    },
  },
});
export const { handleUserAdd, handleRegister, handleTasks, deleteTask,deleteUser } =
  UserSlice.actions;
export default UserSlice.reducer;
