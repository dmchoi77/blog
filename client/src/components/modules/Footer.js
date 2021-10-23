import React from 'react';
import styled from 'styled-components';

function Footer() {

    return (
        <Container>
            <Content>
                <div>Contact - minminnn11@daum.net</div>
                <div className="cr">Copyright©dmchoi 2021</div>
            </Content>
        </Container>
    )
}

const Container = styled.div`
    width : 100%;
    background-color: #0d6efd;
`

const Content = styled.div`
    margin : 0 auto;
    width: 1340px;
    height : 70px;
    left: 0;
    right: 0;
    bottom: 0;
    padding-top : 15px;
    text-align: center;
    color: white;
    font-weight: 600;
    font-size : 0.3rem;

    @media(max-width : 811px) {
        width: 100%;
        height : 4rem;
    }
`

export default Footer;