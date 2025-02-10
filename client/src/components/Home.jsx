import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const HomeContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #93c5fd;  /* Tailwind blue-300 */
`;

const Logo = styled.div`
  width: 120px;
  height: 120px;
  background-color: #2c3e50;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
  
  &:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease;
  }
`;

const LogoText = styled.span`
  color: white;
  font-size: 2rem;
  font-weight: bold;
`;

const Tagline = styled.h2`
  color: #2c3e50;
  font-size: 1.5rem;
  margin-bottom: 30px;
  text-align: center;
  max-width: 600px;
  line-height: 1.4;
`;

function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/news');
  };

  return (
    <HomeContainer>
      <Logo onClick={handleClick}>
        <LogoText>DN</LogoText>
      </Logo>
      <Tagline>
        Decentralized News: Transparent, Unbiased, Verified
      </Tagline>
    </HomeContainer>
  );
}

export default Home; 