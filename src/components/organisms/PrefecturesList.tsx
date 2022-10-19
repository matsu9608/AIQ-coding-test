import React from 'react'
import CheckBox from '../atoms/checkBox'
import { useSelector } from 'react-redux'
import { selectAnalysisState } from '../../Stores/analysisSlice'

type Props = {
  onChenge?: React.ChangeEventHandler<HTMLInputElement>
}

const CheckBoxList: React.FC<Props> = (props) => {
  const { onChenge } = props
  const state = useSelector(selectAnalysisState)

  return (
    <>
      <label>都道府県</label>
      <div>
        {state.prefectures.map((element) => (
          <>
            <label>
              <CheckBox
                id={element?.id}
                checked={state.checked.includes(element.name)}
                onChenge={onChenge}
                value={element?.name}
              />
              {element?.name}
            </label>
          </>
        ))}
      </div>
    </>
  )
}

export default CheckBoxList
