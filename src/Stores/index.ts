import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../app/store";

// API URL PASS 

// ログインinfo type
export type authen = {
    userid:string,
    password:string,
    [key: string]: string;
}

// エラーtype
export type error = {
  userid:boolean,
  password:boolean,
}


// stateの型
export type initialState = {
  isLoginView:boolean,
  profile:{
    id:Number,
    username:string
  },
  authen:authen,
  error:error
}
;

// 初期値
const initialState :initialState= {
  authen:{
    userid:"",
    password:"",
  },
  isLoginView:false, // Loginモードの確認
  profile:{
    id:0,
    username:""
  },
  error:{
    userid:false,
    password:false
  }
};



export const loginSlice = createSlice({
  name:"login",
  initialState:initialState,  
  reducers: {
    
  }
});


export const selectLoginState = (state: RootState) => state.login;
export const {} = loginSlice.actions;

export default loginSlice.reducer;
