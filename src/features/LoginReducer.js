import { createSlice } from "@reduxjs/toolkit";

var local_storage = JSON.parse(localStorage.getItem('token'));
var loginStatus ;
var email;
var username;

if(local_storage){
    loginStatus = local_storage.login;
    email = local_storage.useremail;
    username = local_storage.username;
}
else{
    loginStatus = false;
}
const LoginReducer = createSlice({
    name:"loginReducer",
    initialState:{
        username:username,
        email:email,
        setSignedin:loginStatus,
        projects:[],
    },
    reducers :{
        setUsername:(state,action)=>{
            state.username= action.payload
        },
        updateEmail: (state,action)=>{
            state.email = action.payload
        },
        updateLogin:(state,action)=>{
            state.setSignedin = action.payload
        },
        setProjects:(state,action)=>{
            state.projects = action.payload;
        }
    }
    
})
export const {updateEmail,updateLogin,setProjects,setUsername} = LoginReducer.actions;
export default LoginReducer.reducer;