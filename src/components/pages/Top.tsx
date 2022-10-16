import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { fetchAsyncPrefectures } from '../../Stores/analysisSlice';

const Top: React.FC= (props) => {
 
  const dispatch = useDispatch<AppDispatch>();
  // 取得テスト用
  useEffect(() => {
    dispatch(fetchAsyncPrefectures());
  },[]);

  return (
    <>
      <p>テスト</p>
    </>
  )
}

export default Top
