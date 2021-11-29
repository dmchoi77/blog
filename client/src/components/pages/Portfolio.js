import React from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'

function PortfoListo() {



    return (
        <Container>
            <Helmet>
                <title>포트폴리오 - dmchoi blog</title>
            </Helmet>
            <List>
                <a href="http://dmchoi.herokuapp.com/" target='_blank'>개인 블로그 구축 프로젝트 (현재 사이트)</a>
                <a href="https://github.com/Dong-min-choi/blog" target='_blank' ><Image src="/img/github.png" /></a>
            </List>
            <List>
                <a href="https://introduceiu.herokuapp.com/" target='_blank'>아이유 소개 페이지</a>
                <a href="https://github.com/Dong-min-choi/introduceiu" target='_blank' ><Image src="/img/github.png" /></a>
            </List>
        </Container>
    )
}

const Container = styled.div`
  padding : 3rem 0 0;
  margin : 10px auto 7rem;
//   text-aListgn : center;

  @media(max-width : 811px) {
    width : 100%;
}
`
const List = styled.li`
  list-style: unset !important;
`
const Image = styled.img`
    width : 30px;
    heigth : 30px;
    margin-left : 5px;
`

export default PortfoListo;