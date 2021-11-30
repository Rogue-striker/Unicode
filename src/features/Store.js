import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "./LoginReducer"

const Store = configureStore({
    reducer:{
    login:LoginReducer
}}
)
export default Store