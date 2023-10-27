import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../utils/axios";
import round from "lodash.round";
let user = JSON.parse(localStorage.getItem("user"));
let counter = 0;
    user?.usercheckout?.forEach(elem => {
      counter += elem.count
    // console.log(counter);

    }) 
  

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  status: null,
  value: user? user.usercheckout : [],
  count: counter,
  favstate: user? user.userwishlist : [],
  favcount: user? user.userwishlist.length : 0,
};

const Basketslice = createSlice({
  name: "basketitem",
  initialState,
  reducers: {
    handleBasket: (state, actions) => {
      user = JSON.parse(localStorage.getItem("user"))
      if (state.value.find((x) => x.dataa?._id === actions.payload._id)) {
        state.value.forEach((element) => {
          if (element.dataa._id === actions.payload._id) {
            element.count += 1;
            state.count += 1;
          }
        });
      } else {
        state.value.push({ count: 1, dataa: actions.payload });
        state.count += 1;
      }
      let userr = {
        username: user.username,
        password: user.password,
        posts: user.posts,
        userwishlist: state.favstate,
        usercheckout: state.value,
        _id: user._id,
      };
      localStorage.setItem("user", JSON.stringify(userr));
        axios.put(`https://fashi-virid.vercel.app/users/${user._id}`, JSON.stringify(userr), {
          headers: {
            "Content-Type": "application/json",
          },
        }); 
        console.log(userr);

      toast.success(" Product added Basket!", {
        position: "top-right",
        autoClose: 2400,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
    handleCheckout: (state, actions) => {
      const user = JSON.parse(localStorage.getItem("user"));
      const userCheckoutItems = user.usercheckout;
      user.usercheckout = [];
      if (userCheckoutItems.length > 0) {
        user.posts = [...user.posts, ...userCheckoutItems];
      }
      localStorage.setItem("user", JSON.stringify(user));
      axios.put(`https://fashi-virid.vercel.app/users/${user._id}`, JSON.stringify(user), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      state.count = 0;
      state.value = [];
    },
    

    deleteitem: (state, actions) => {
      user = JSON.parse(localStorage.getItem("user"))
      state.value = state.value.filter(
        (x) => x.dataa?._id !== actions.payload._id
      );
      state.count=0
      state.value.forEach(elem => {
        state.count += elem.count
      })
     

      const deleteitem = {
        username: user.username,
        password: user.password,
        posts: user.posts,
        userwishlist: state.favstate,
        usercheckout: state.value,
        _id: user._id,
      };
      localStorage.setItem("user", JSON.stringify(deleteitem));
      axios.put(`https://fashi-virid.vercel.app/users/${user._id}`, JSON.stringify(deleteitem),
       {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },

    favitem: (state, actions) => {
      user = JSON.parse(localStorage.getItem("user"))
      if (state.favstate.find((x) => x.dataa?._id === actions.payload._id)) {
        toast.error(" Already added Favs!", {
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
        state.favstate.push({ dataa: actions.payload });
        state.favcount = state.favcount + 1;

        const fav = {
          username: user.username,
          password: user.password,
          posts: user.posts,
          userwishlist: state.favstate,
          usercheckout: state.value,
          _id: user._id,
        };
        localStorage.setItem("user", JSON.stringify(fav));
        axios.put(`https://fashi-virid.vercel.app/users/${user._id}`, JSON.stringify(fav),
        {
          headers: {
            "Content-Type": "application/json",
          },
        })
        toast.success(" Product added Favs!", {
          position: "top-right",
          autoClose: 2400,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    },
    deletefavitem: (state, actions) => {
      state.favstate = state.favstate.filter(
        (x) => x.dataa?._id !== actions.payload._id
      );
      state.favcount = state.favstate.length;

      const fav = {
        username: user.username,
        password: user.password,
        usercheckout: user.usercheckout,
        posts: user.posts,
        userwishlist: state.favstate,
        _id: user._id,
      };
      localStorage.setItem("user", JSON.stringify(fav));
      axios.put(`https://fashi-virid.vercel.app/users/${user._id}`, JSON.stringify(fav),
      {
        headers: {
          "Content-Type": "application/json",
        },
      })
    },

    decrementproduct: (state, actions) => {
      state.value.forEach((element) => {
        if (element.dataa._id === actions.payload._id) {
          element.count -= 1;
          if (element.count === 0) {
            state.value = state.value.filter(
              (x) => x.elem._id !== actions.payload._id
            );
          }
     

          let userr = {
            username: user.username,
            password: user.password,
            posts: user.posts,
            userwishlist: state.favstate,
            usercheckout: state.value,
            _id: user._id,
          };
          localStorage.setItem("user", JSON.stringify(userr));
          axios.put(`https://fashi-virid.vercel.app/users/${user._id}`, JSON.stringify(userr),
          {
            headers: {
              "Content-Type": "application/json",
            },
          })
        }
      });
      state.count -= 1;
    },
  },
});
export const {
  handleBasket,
  handleCheckout,
  deleteitem,
  decrement,
  favitem,
  deletefavitem,
  decrementproduct,
} = Basketslice.actions;
export default Basketslice.reducer;
