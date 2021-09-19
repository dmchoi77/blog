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
                <hr style={{ margin: ".5rem" }} />
                <Link to={"/board/list"}>
                    <li>게시판</li>
                </Link>
            </Contents>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width : auto;
    padding : 4rem 0rem ;
    position : fixed;
    margin-left : -5.5em;
    // 800px 이하는 반응형
    @media (max-width : 800px) { 
        // display :flex;
        // width : 0px
    }
`

const Contents = styled.div`
    display : inline-block;    
    width : 100%;
`

export default LeftNav;