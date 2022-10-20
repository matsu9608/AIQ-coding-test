import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import axios from 'axios'

// API URL PASS
const endPoint = 'https://opendata.resas-portal.go.jp'

// state全体
export type InitialState = {
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
const initialState: InitialState = {
  prefectures: [],
  Demographics: [],
  checked: [],
}

/// APIレスポンス
// 都道府県情報レスポンスの型
export type resPrefectures = [
  {
    prefCode: number
    prefName: string
  },
]

// 人口構成情報レスポンスの型
export type resDemographics = {
  data: [
    {
      year: number
      value: number
    },
  ]
  prefectures?: string
}

// 都道府県一覧データ取得
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

// 人口構成一覧データ取得
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
    setCheckBox(state, action: PayloadAction<string>) {
      state.checked.push(action.payload)
    },

    clearCheckBox(state, action: PayloadAction<string>) {
      state.checked.splice(state.checked.indexOf(action.payload), 1)
    },

    clearCheckedDemographics(state, action: PayloadAction<string>) {
      state.Demographics.forEach((element, i) => {
        if (element.prefecture === action.payload) {
          state.Demographics.splice(i, 1)
        }
      })
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncPrefectures.fulfilled, (state, action) => {
      if (Array.isArray(action.payload)) {
        state.prefectures = []
        action.payload.forEach((element) => {
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

        // 取得した都道府県情報が既にあるかどうか
        // あれば削除
        demographics.forEach((element, i) => {
          if (element.prefecture === action.payload.prefectures) {
            demographics.splice(i, 1)
          }
        })
        demographics.push({
          prefecture: action.payload.prefectures,
          data: action.payload.data,
        })

        state.Demographics = demographics
      }
    })

    builder.addCase(fetchAsyncDemographics.rejected, (state, action) => {})

    builder.addCase(fetchAsyncDemographics.pending, (state, action) => {})
  },
})

// analysisSliceのstate
export const selectAnalysisState = (state: RootState) => state.analysis

// analysisSliceの都道府県一覧情報を管理しているstate
export const selectPrefecturesState = (state: RootState) =>
  state.analysis.prefectures

// analysisSliceの人口構成情報を管理しているstate
export const selectDemographicsState = (state: RootState) =>
  state.analysis.Demographics

// analysisSliceの各アクション
export const {
  setCheckBox,
  clearCheckBox,
  clearCheckedDemographics,
} = analysisSlice.actions

// reducer
export default analysisSlice.reducer
