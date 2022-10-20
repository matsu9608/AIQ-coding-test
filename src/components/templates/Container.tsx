import React, { ReactNode } from 'react'

export type ContainerProps = {
  children: ReactNode
}

const Container: React.FC<ContainerProps> = (props) => {

  const conainerStyle = {
    margin:"0 100px"
  }

  const { children } = props

  return (
    <div style = {conainerStyle}>
      <header style={{ textAlign: 'center' }}>
        <h2 className='h1'>都道府県別人口推移グラフ</h2>
      </header>
      {children}
    </div>
  )
}

export default Container
