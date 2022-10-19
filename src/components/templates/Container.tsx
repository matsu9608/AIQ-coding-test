import React, { ReactNode } from 'react'

export type ContainerProps = {
  children: ReactNode
}

const Container: React.FC<ContainerProps> = (props) => {
  const { children } = props

  return (
    <>
      <header style={{ textAlign: 'center' }}>
        <h1>都道府県別人口推移グラフ</h1>
      </header>
      {children}
    </>
  )
}

export default Container
