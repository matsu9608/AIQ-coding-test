import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../app/store'
import {
  fetchAsyncDemographics,
  fetchAsyncPrefectures,
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
    dispatch(fetchAsyncDemographics(e.target.value))
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
