import React from 'react';

const Home = () => {
  return (
    <div className="landing-container">
      <section className="hero-section">
        <div className="logo-container">
          <img 
            src="https://iq.wiki/_next/image?url=https%3A%2F%2Fipfs.everipedia.org%2Fipfs%2FQmTFHqfakxRqf7AsA7pZJ5iQnRFXyRrFBbe2ASjocZc492&w=3840&q=95"
            alt="Eigen Layer Logo" 
          />
          <img 
            src="https://miro.medium.com/v2/resize:fit:1400/0*FBqY7vMvkpoBFKLT"
            alt="Eliza OS Logo" 
          />
        </div>
        <h1 className="hero-title ">
          Verifiable AI Agents on Eigen Layer
        </h1>
        <p className="hero-subtitle">
          Building the future of trustless AI verification through the power of Eigen Layer 
          and Eliza OS. Create, deploy, and verify AI agents with unprecedented transparency 
          and reliability.
        </p>
        <button className="cta-button">
          Get Started
        </button>
      </section>
    </div>
  );
};

export default Home;