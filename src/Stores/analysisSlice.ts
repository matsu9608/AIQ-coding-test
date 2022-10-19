import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import axios from 'axios'

// API URL PASS
const endPoint = 'https://opendata.resas-portal.go.jp'

// state全体
export type initialState = {
  prefectures: {
    id: string
    name: string
  }[]
  Demographics: {
    prefecture?: string
    data: {
      year: number
      value: number
    }[]
  }[]
  checked: String[]
}

// 初期値
const initialState: initialState = {
  prefectures: [],
  Demographics: [],
  checked: [],
}

/// APIレスポンス
// 都道府県情報レスポンス
export type resPrefectures = [
  {
    prefCode: number
    prefName: string
  },
]

// 人口構成情報レスポンス
export type resDemographics = {
  data: [
    {
      year: number
      value: number
    },
  ]
  prefectures?: string
}

// 都道府県一覧
export const fetchAsyncPrefectures = createAsyncThunk<
  resPrefectures,
  undefined,
  { rejectValue: string }
>('prefectures/get', async (arg, thankAPI) => {
  try {
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

// 人口構成一覧
export const fetchAsyncDemographics = createAsyncThunk<
  resDemographics,
  string,
  { rejectValue: string }
>('Demographics/get', async (arg, thankAPI) => {
  try {
    const res = await axios.get(
      endPoint + '/api/v1/population/composition/perYear',
      {
        headers: {
          'X-Api-Key': '9ai5GVToFKxkq6oShMKRcaIhUJ9VuQG1KB35xd7p',
        },
        params: {
          prefCode: 1,
          cityCode: '-',
        },
        method: 'GET',
      },
    )
    res.data.result.data[0].prefectures = arg
    return res.data.result.data[0]
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
    setCheckBox(state, action:PayloadAction<string>) {
      state.checked.push(action.payload)
    },

    clearCheckBox(state,action:PayloadAction<string>){
      const index:number = state.checked.indexOf(action.payload)
      state.checked.splice(state.checked.indexOf(action.payload))
    },

    clearCheckedDemographics(state,action:PayloadAction<string>){
      state.Demographics.some((element,i)=> {
        if(element.prefecture = action.payload){
          state.Demographics.splice(i,1);
        }
      })
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncPrefectures.fulfilled, (state, action) => {
      if (Array.isArray(action.payload)) {
        state.prefectures = []
        action.payload.map((element) => {
          state.prefectures?.push({
            id: element.prefCode.toString(),
            name: element.prefName,
          })
        })
      }
    })

    builder.addCase(fetchAsyncPrefectures.rejected, (state, action) => {})

    builder.addCase(fetchAsyncPrefectures.pending, (state, action) => {})

    builder.addCase(fetchAsyncDemographics.fulfilled, (state, action) => {
      if (Array.isArray(action.payload.data)) {
        type Demographics = {
          prefecture?: string
          data: {
            year: number
            value: number
          }[]
        }[]

        const demographics: Demographics = state.Demographics
        console.log(action.payload.prefectures)

        // 取得した都道府県情報が既にあるかどうか
        // あれば削除
        demographics.forEach((element, i) => {
          console.log(element.prefecture)
          if (element.prefecture === action.payload.prefectures) {
            console.log(element.prefecture)
            demographics.splice(i, 1)
          }
        })

        console.log(demographics)
        demographics.push({
          prefecture: action.payload.prefectures,
          data: action.payload.data,
        })
        console.log(demographics)

        state.Demographics = demographics
      }
    })

    builder.addCase(fetchAsyncDemographics.rejected, (state, action) => {})

    builder.addCase(fetchAsyncDemographics.pending, (state, action) => {})
  },
})

export const selectAnalysisState = (state: RootState) => state.analysis
export const selectPrefecturesState = (state: RootState) =>
  state.analysis.prefectures
export const selectDemographicsState = (state: RootState) =>
  state.analysis.Demographics
export const {setCheckBox,clearCheckBox,clearCheckedDemographics} = analysisSlice.actions

export default analysisSlice.reducer
