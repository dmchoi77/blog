import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function LeftNav() {

    return (
        <Container>
            <Contents>
                <Link to={"/home"}>
                    <li>HOME</li>
                </Link>
                <li>프로필</li>
                <li>포트폴리오</li>
                <hr style={{ margin: ".5rem", width: "6rem" }} />
                <Link to={"/board/list"}>
                    <li>게시판</li>
                </Link >
            </Contents>
        </Container>
    )
}

const Container = styled.div`
    margin : 0 auto;
    font-size : 1.1em;
    display : flex;
    margin-top : 5rem;
    width: 100px;
    position : relative;
`

const Contents = styled.div`
    margin-top : 10px;
    height: 100%;
    width: 100%;
    display : flex;
    flex-direction: column;
    position : fixed;
`

export default LeftNav;