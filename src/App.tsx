import React from 'react'
import './App.css'
import  PrefecturesDemographics from './components/pages/ PrefecturesDemographics'
import { Provider } from 'react-redux'
import { store } from './app/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
        < PrefecturesDemographics />
    </Provider>
  )
}

export default App
