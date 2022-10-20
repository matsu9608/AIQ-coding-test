import React from 'react'

type CheckBoxProps = {
  id?: string
  checked?: boolean
  onChenge?: React.ChangeEventHandler<HTMLInputElement>
  value?: string
  checkbox? :{
    display:string 
  }
}

const CheckBox: React.FC<CheckBoxProps> = (props) => { 
  const { id, checked, onChenge, value ,checkbox} = props

  return (
    <>
      <input
        id={id}
        type="checkbox"
        style = {checkbox}
        name="prefectureName"
        checked={checked}
        value={value}
        onChange={onChenge}
      />
    </>
  )
}

export default CheckBox
