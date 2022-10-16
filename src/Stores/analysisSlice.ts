import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import axios from 'axios'
import { CheckJsDirective } from 'typescript'

// API URL PASS
const endPoint = 'https://opendata.resas-portal.go.jp'

// state全体
export type initialState = {
  prefectures: [
    {
      id: string
      name: string
      checked: boolean
    }?,
  ]
}

// 初期値
const initialState: initialState = {
  prefectures: [],
}

/// APIレスポンス

// 都道府県情報レスポンス
export type resPrefectures = [
  {
    prefCode: number
    prefName: string
  },
]

// 都道府県一覧
export const fetchAsyncPrefectures = createAsyncThunk<
  resPrefectures,
  undefined,
  { rejectValue: string }
>('prefectures/get', async (auth, thankAPI) => {
  try {
    console.log(endPoint + '/api/v1/prefectures')
    const res = await axios.get(endPoint + '/api/v1/prefectures', {
      headers: {
        'X-Api-Key': '9ai5GVToFKxkq6oShMKRcaIhUJ9VuQG1KB35xd7p',
      },
      method: 'GET',
    })
    return res.data['result']
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      return thankAPI.rejectWithValue(e.response.data)
    }
  }
})


export const analysisSlice = createSlice({
  name: 'analysis',
  initialState: initialState,
  reducers: {
    setCheckBok(state, action) {
      state.prefectures.filter(n => n?.id === action.payload)[0]?.checked
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncPrefectures.fulfilled, (state, action) => {
      if (Array.isArray(action.payload)) {
        state.prefectures = []
        action.payload.map((element) => {
          state.prefectures?.push({
            id: element.prefCode.toString(),
            name: element.prefName,
            checked: false,
          })
        })
      }
    })

    builder.addCase(fetchAsyncPrefectures.rejected, (state, action) => {
    })

    builder.addCase(fetchAsyncPrefectures.pending, (state, action) => {})

    
  },
})

export const selectAnalysisState = (state: RootState) => state.analysis
export const {} = analysisSlice.actions

export default analysisSlice.reducer
