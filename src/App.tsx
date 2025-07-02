import './App.css'
import CreateMovie from './components/CreateMovie'
import MoviesContainer from './components/MoviesContainer'
import Navbar from './components/Navbar'
function App() {
  return (
      <div>
          <Navbar/>
          <CreateMovie/>
          <MoviesContainer/>
          
      </div>
  )
}

export default App
