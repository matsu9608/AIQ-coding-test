import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../app/store'
import {
  clearCheckBox,
  clearCheckedDemographics,
  fetchAsyncDemographics,
  fetchAsyncPrefectures,
  setCheckBox,
} from '../../Stores/analysisSlice'
import LineGraph from '../organisms/LineGraph'
import CheckBoxList from '../organisms/PrefecturesList'
import Container from '../templates/Container'

const PrefecturesDemographics: React.FC = (props) => {
  const dispatch = useDispatch<AppDispatch>()

  // 取得テスト用
  useEffect(() => {
    dispatch(fetchAsyncPrefectures())
  }, [])

  // チェックボックスのチェンジイベント
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch(e.target.checked){
      case true:
        dispatch(setCheckBox(e.target.value))
        dispatch(fetchAsyncDemographics(e.target.value))
        break;
      default:
        dispatch(clearCheckBox(e.target.value))
        dispatch(clearCheckedDemographics(e.target.value))
    }
  
    console.log(e.target.checked)
  }

  return (
    <>
      <Container>
        <CheckBoxList onChenge={handleChange} />
        <LineGraph />
      </Container>
    </>
  )
}

export default PrefecturesDemographics
