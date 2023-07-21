import logo from './assets/CandyCrush.png'
import './App.scss'
import GameBoard from './components/GameBoard'

function App() {
  return (
    <div className="app">
      <img src={logo} alt="Logo" className='logo'/>
      <GameBoard />
    </div>
  )
}

export default App
