import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import ReferralSystem from './pages/ReferralSystem/ReferralSystem';
import NotFound from './pages/NotFound/NotFound';
import Dapp from './pages/Dapp/Dapp';


import './App.css';
import './i18n'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/referral-system" element={<ReferralSystem />} />
        <Route path="/dapp" element={<Dapp/>} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
