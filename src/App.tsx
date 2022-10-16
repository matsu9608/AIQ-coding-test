import React from 'react'
import logo from './logo.svg'
import './App.css'
import Top from './components/pages/Top'
import { Provider } from 'react-redux'
import { store } from './app/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Top />
    </Provider>
  )
}

export default App
