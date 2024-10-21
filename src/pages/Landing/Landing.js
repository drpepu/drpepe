
import React from 'react';
import Hero from '../../components/Hero/Hero';
import VideoComparison from '../../components/VideoComparison/VideoComparison';
import Reasons from '../../components/Reasons/Reasons';
import Tokenomics from '../../components/Tokenomics/Tokenomics';
import Footer from '../../components/Footer/Footer'


function Landing() {

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

export default Landing;
