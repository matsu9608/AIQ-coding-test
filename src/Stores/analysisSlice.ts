import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import axios from 'axios'


// API URL PASS
const endPoint = 'https://opendata.resas-portal.go.jp'

// stateの型
export type initialState = {
  prefectures?:[
    {
      id:string,
      name:string
    }
  ],
}

// 初期値
const initialState: initialState = {
  prefectures:[
    {
      id:"",
      name:""
    }
  ],

}

// 都道府県一覧
export const fetchAsyncPrefectures = createAsyncThunk<any, undefined, {rejectValue: string;}>(
  "prefectures/get",
  async (auth,thankAPI) => {
    try {
      alert("API取得開始")
      console.log(endPoint + '/api/v1/prefectures')
      const res = await axios.get(endPoint + '/api/v1/prefectures', {
        headers: {
          'X-Api-Key': '9ai5GVToFKxkq6oShMKRcaIhUJ9VuQG1KB35xd7p',
        },

        method: 'GET',
      })
      alert("API取得完了")
      return res.data["result"]

    } catch (e) {
      alert('error発生')
      if (axios.isAxiosError(e) && e.response) {
        return thankAPI.rejectWithValue(e.response.data)
      }
    
    }
  },
)

export const analysisSlice = createSlice({
  name: "analysis",
  initialState: initialState,
  reducers: {
  },
  extraReducers: (builder) => {

    builder.addCase(fetchAsyncPrefectures.fulfilled, (state, action) => {
      console.log(action.payload)
      alert("成功")
      if(Array.isArray(action.payload["result"]) && action.payload["result"].length > 0){
        state.prefectures = action.payload.result
      }
    })
    
    builder.addCase(fetchAsyncPrefectures.rejected, (state, action) => {alert("失敗")})
      
    builder.addCase(fetchAsyncPrefectures.pending, (state, action) => {
      
    })
  },
})

export const selectLoginState = (state: RootState) => state.test
export const {} = analysisSlice.actions

export default analysisSlice.reducer
