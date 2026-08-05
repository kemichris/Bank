import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/public/Home';
import { About } from './pages/public/About';
import { PersonalBanking } from './pages/public/PersonalBanking';
import { BusinessBanking } from './pages/public/BusinessBanking';
import { Loans } from './pages/public/Loans';
import { Contact } from './pages/public/Contact';
import { PrivacyPolicy } from './pages/public/PrivacyPolicy';
import { Terms } from './pages/public/Terms';

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
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </>
  )
}

export default App
