import React from "react";
import styled from "styled-components";

function Footer() {
  return (
    <Container>
      <Content>
        <ul>
          <li>
            <a href="https://github.com/dmchoi77">Github</a>
          </li>
          <li>
            <a href="mailto:dm.choi.dev@gmail.com">Contact</a>
          </li>
        </ul>
      </Content>
    </Container>
  );
}

const Container = styled.footer`
  width: 1100px;
  margin: 0 auto;
  padding: 0 5rem 0;
  background-color: #ffff;

  @media (max-width: 987px) {
    width: 100%;
  }
`;

const Content = styled.div`
  // width : 100%;
  display: flex;
  height: 70px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;
  border-top: 0.1px solid #f0f0f0;
  color: #dbdbdb;
  font-weight: 500;

  ul {
    display: flex;
    align-items: center;
    margin-top: revert;
    cursor: pointer;
    padding: 0;
  }
`;

export default Footer;
