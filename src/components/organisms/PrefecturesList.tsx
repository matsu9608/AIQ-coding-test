import React from 'react'
import CheckBox from '../atoms/checkBox'
import Label from '../atoms/Label'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../app/store'
import { selectAnalysisState } from '../../Stores/analysisSlice'
import LineGraph from './LineGraph'

type Props = {
  onChenge? :React.ChangeEventHandler<HTMLInputElement> 
} 

const CheckBoxList: React.FC<Props> = (props) => {
  const {onChenge} = props
  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector(selectAnalysisState)

  return (
    <>
      <label>都道府県</label>
      <div>
        {state.prefectures.map((element) => (
          <>
            <label>
              <CheckBox
                id = {element?.id}
                checked={element?.checked}
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
