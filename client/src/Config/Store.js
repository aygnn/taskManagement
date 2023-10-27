import { configureStore } from "@reduxjs/toolkit";
 import basketReducer from "./BasketSlice";

 export const store=configureStore({
    reducer:{
        basketitem:basketReducer
    }
})