import { createSlice } from "@reduxjs/toolkit";

var local_storage = JSON.parse(localStorage.getItem('token'));


const LoginReducer = createSlice({
    name:"loginReducer",
    initialState:{
        username:"",
        email:"",
        password:"",
        setSignedin:local_storage.login,
        UserId:"",
        otp:"",
        projects:[],
    },
    reducers :{
        setUsername:(state,action)=>{
            state.username= action.payload
        },
        updateEmail: (state,action)=>{
            state.email = action.payload
        },
        updatePassword:(state,action)=>{
            state.password = action.payload
           
        },
        updateLogin:(state,action)=>{
            state.setSignedin = action.payload
        },
        setUserid:(state,action)=>{
            state.UserId = action.payload;
        },
        setOtp:(state,action)=>{
            state.otp = action.payload;
        },
        setProjects:(state,action)=>{
            state.projects = action.payload;
        }
    }
    
})
export const {updateEmail,updatePassword,updateLogin,setUserid,setOtp,setProjects} = LoginReducer.actions;
 export default LoginReducer.reducer;