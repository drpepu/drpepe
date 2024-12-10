import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import ReferralSystem from './pages/ReferralSystem/ReferralSystem';
import ReferralSystemTwo from './pages/ReferralSystem/ReferralSystemTwo';
import NotFound from './pages/NotFound/NotFound';
import Agent from './pages/Agent/Agent';
import ReferralGraph from './pages/ReferralGraph/ReferralGraph';
import ArDrive from './pages/ArDrive/Ardrive';
import Blog from './pages/Blog/Blog'

import LeaderboardReferrals2 from './components/LeaderboardReferrals/LeaderboardReferrals2';
import LeaderboardReferrals3 from './components/LeaderboardReferrals/LeaderboardReferrals2'


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
              <Route path="/referral-program-new-database-structure" element={<ReferralSystemTwo />} />
              <Route path="/graphics" element={<ReferralGraph/>} />
              <Route path="/agent" element={<Agent />} />
              <Route path="/immortality" element={<ArDrive />} />
              <Route path="/leaderboard" element={<LeaderboardReferrals2 />} />
              <Route path="/leaderboard3" element={<LeaderboardReferrals3 />} />
              <Route path="/blog/*" element={<Blog />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
