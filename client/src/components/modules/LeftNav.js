import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function LeftNav() {

    return (
        <Wrapper>
            <Contents>
                <Link to={"/home"}>
                    <li>HOME</li>
                </Link>
                <li>프로필</li>
                <li>포트폴리오</li>
                {/* <hr style={{ margin: ".5rem", width : "6rem" }} /> */}
                <Link to={"/board/list"}>
                    <li>게시판</li>
                </Link>
            </Contents>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display : flex;
    margin-top : 110px;
    overflow-y: auto;
    width: 120%;
    height: 100%;
    position : fixed;



    // 800px 이하는 반응형
    @media (max-width : 800px) { 
    
    }
`

const Contents = styled.div`
    height: 100%;
    width: 240px;
    display: flex;
    flex-direction: column;
    text-align : center;
`

export default LeftNav;