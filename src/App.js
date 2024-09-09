import './App.css';
import Hero from './components/Hero/Hero';
import VideoComparison from './components/VideoComparison/VideoComparison';
import Reasons from './components/Reasons/Reasons';
import Tokenomics from './components/Tokenomics/Tokenomics';
import Footer from './components/Footer/Footer';
import './i18n'; 


function App() {
  return (
    <>
      <Hero />
      <VideoComparison />
      <Reasons />
      <Tokenomics />
      <Footer />
    </>
  );
}

export default App;
