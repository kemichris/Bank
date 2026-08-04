import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/public/Home';
import { About } from './pages/public/About';
import { PersonalBanking } from './pages/public/PersonalBanking';
import { BusinessBanking } from './pages/public/BusinessBanking';
import "./styles/style.css"
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/personal-banking" element={<PersonalBanking />} />
      <Route path="/business-banking" element={<BusinessBanking />} />
    </Routes>
  )
}

export default App
