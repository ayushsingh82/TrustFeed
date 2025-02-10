import React from "react";
import styled from "styled-components";

const NewsContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #93c5fd;  /* Tailwind blue-300 */
  padding: 20px;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 40px;
  width: 100%;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 2.5rem;
`;

const News = () => {
  return (
    <NewsContainer>
      <ContentWrapper>
        <Header>
          <Title>Decentralized News Feed</Title>
        </Header>
        {/* News content will go here */}
      </ContentWrapper>
    </NewsContainer>
  );
};

export default News; 