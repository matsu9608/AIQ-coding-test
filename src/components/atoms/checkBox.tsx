import React from 'react'

type CheckBox = {
  id?: string
  checked?: boolean
  onChenge?: React.ChangeEventHandler<HTMLInputElement>
  value?: string
}

const checkBox: React.FC<CheckBox> = (props) => {
  const { id, checked, onChenge, value } = props

  return (
    <>
      <input
        id={id}
        type="checkbox"
        name="prefectureName"
        checked={checked}
        value={value}
        onChange={onChenge}
      />
    </>
  )
}

export default checkBox
