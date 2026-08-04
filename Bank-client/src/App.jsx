import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/public/Home';
import { About } from './pages/public/About';
import { PersonalBanking } from './pages/public/PersonalBanking';
import { BusinessBanking } from './pages/public/BusinessBanking';
import { Loans } from './pages/public/Loans';

import ScrollToTop from './components/common/ScrollToTop';
import "./styles/style.css"
function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/personal-banking" element={<PersonalBanking />} />
        <Route path="/business-banking" element={<BusinessBanking />} />
        <Route path="/loans" element={<Loans />} />
      </Routes>
    </>
  )
}

export default App
