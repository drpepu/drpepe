import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import ReferralSystem from './pages/ReferralSystem/ReferralSystem';
import NotFound from './pages/NotFound/NotFound';
import Dapp from './pages/Dapp/Dapp';

// Import Solana wallet adapter components
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

import './App.css';
import './i18n'; 

function App() {
  // Just use an empty array without the type annotation
  const wallets = [];

  return (
    <ConnectionProvider endpoint={clusterApiUrl('devnet')}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/referral-system" element={<ReferralSystem />} />
              <Route path="/dapp" element={<Dapp />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
