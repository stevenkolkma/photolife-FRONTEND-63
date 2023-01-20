import React from "react";
import styled from "styled-components";

export default function Footer() {
  return (
    <div>
      <FooterWrapper>
        <FooterContainer>
          <FooterList>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
            <li>
              <a href="#">Terms of Service</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
          </FooterList>
          <p>Copyright 2023, PhotoLife</p>
        </FooterContainer>
      </FooterWrapper>
    </div>
  );
}

const FooterWrapper = styled.footer`
  background-color: #333;
  color: white;
  padding: 20px 0;
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FooterList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;

  li {
    margin-right: 20px;
  }

  a {
    color: white;
    text-decoration: none;
  }
`;

const FooterParagraph = styled.p`
  margin: 0;
`;
