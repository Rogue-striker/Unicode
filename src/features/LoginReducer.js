import { createSlice } from "@reduxjs/toolkit";

const LoginReducer = createSlice({
    name:"loginReducer",
    initialState:{
        email:"",
        password:"",
        setSignedin:false,
        UserId:"",
        otp:"",
    },
    reducers :{
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
        }
    }
    
})
export const {updateEmail,updatePassword,updateLogin,setUserid,setOtp} = LoginReducer.actions;
 export default LoginReducer.reducer;