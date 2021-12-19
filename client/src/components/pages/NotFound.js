import React from 'react';
import styled from 'styled-components';
import SEO from '../modules/SEO';

function NotFound() {

    return (
        <Container>
            <SEO
                title={"404"}
                description={"페이지를 찾을 수 없습니다."}
            />
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