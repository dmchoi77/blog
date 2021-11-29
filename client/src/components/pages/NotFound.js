import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet'

function NotFound() {

    return (
        <Container>
            <Helmet>
                <title>404 - dmchoi blog</title>
            </Helmet>
            <h1>존재하지 않는 페이지입니다.</h1>
            <h5>경로를 확인해주세요.</h5>
        </Container>
    )
}


const Container = styled.div`
  padding : 3rem 0 0;
  margin : 0 auto 7rem;
  text-align : center;

  @media(max-width : 811px) {
    width : 100%;
}
`

export default NotFound;