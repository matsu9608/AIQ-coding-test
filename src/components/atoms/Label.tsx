import React from 'react'

type Label = {
  label?: string
}

const Label: React.FC<Label> = (props) => {
  const { label } = props
  return <label>{label}</label>
}

export default Label
