import React, { ReactNode, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { fetchAsyncPrefectures } from '../../Stores/analysisSlice';

export type Container = {
  children: ReactNode;
}

const Container: React.FC <Container> = (props) => {
  
  const { children } = props


  return (
    <>
      <header style={{ textAlign: "center" }}>
        <h1>都道府県別人口推移グラフ</h1>
      </header>
      {children}
    </>
  )
}

export default Container