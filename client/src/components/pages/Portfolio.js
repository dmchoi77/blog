import React from "react";
import styled from "styled-components";
import SEO from "../modules/SEO";

function Portfolilo() {
  return (
    <Container>
      <SEO title={"포트폴리오"} description={"포트폴리오"} url={"portfolio"} />
      <List>
        <a href="http://dmchoi.herokuapp.com/" target="_blank" rel="noreferrer">
          개인 블로그 구축 프로젝트 (현재 사이트)
        </a>
        <a
          href="https://github.com/Dong-min-choi/blog"
          target="_blank"
          rel="noreferrer"
        >
          <Image src="/img/github.png" />
        </a>
      </List>
      <List>
        <a
          href="https://introduceiu.herokuapp.com/"
          target="_blank"
          rel="noreferrer"
        >
          아이유 소개 페이지
        </a>
        <a
          href="https://github.com/Dong-min-choi/introduceiu"
          target="_blank"
          rel="noreferrer"
        >
          <Image src="/img/github.png" />
        </a>
      </List>
    </Container>
  );
}

const Container = styled.div`
  padding: 3rem 0 0;
  margin: 10px auto 7rem;
  //   text-aListgn : center;

  @media (max-width: 811px) {
    width: 100%;
  }
`;
const List = styled.li`
  list-style: unset !important;
`;
const Image = styled.img`
  width: 30px;
  heigth: 30px;
  margin-left: 5px;
`;

export default Portfolilo;
