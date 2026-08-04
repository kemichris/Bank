import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/public/Home';
import { About } from './pages/public/About';
import "./styles/style.css"
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  )
}

export default App
