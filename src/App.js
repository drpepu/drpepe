import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import ReferralSystem from './pages/ReferralSystem/ReferralSystem';
import NotFound from './pages/NotFound/NotFound';
import Agent from './pages/Agent/Agent';
import LeaderboardReferrals from './components/LeaderboardReferrals/LeaderboardReferrals';

// Import Solana wallet adapter components
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { clusterApiUrl } from '@solana/web3.js';

import './App.css';
import './i18n'; 

function App() {
  const endpoint = clusterApiUrl('devnet'); // Switch to 'mainnet-beta' for production
  const wallets = [new PhantomWalletAdapter()]; // Phantom wallet adapter

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/referral-program" element={<ReferralSystem />} />
              <Route path="/agent" element={<Agent />} />
              <Route path="/leaderboard" element={<LeaderboardReferrals />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
