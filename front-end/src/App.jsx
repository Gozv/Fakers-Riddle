import { Link } from 'react-router-dom'
import './App.css'
import GameStory from './components/GameStory'


function App() {
  return (
    <>
      <div>
          <Link to="/register">Register</Link>
      </div>

      <GameStory />
    </>
  )
}

export default App
