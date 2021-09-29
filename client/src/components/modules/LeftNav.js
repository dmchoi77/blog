import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function LeftNav() {

    const [toggle, setToggle] = useState(null);

    const toggleMenu = () => {
        setToggle(!toggle);
    }

    return (
        <div>
            <HeaderToggle className="Header-Toggle" onClick={toggleMenu}>
                <Button src="img/menu.png"></Button>
            </HeaderToggle>
            <div>
                {toggle === null ?
                    null :
                    <nav className={toggle ? "show-toggle-menu" : "disappear-toggle-menu"} onClick={toggleMenu}>
                        <List />
                    </nav>
                }
                {toggle ?
                    <div className="toggle-bg" onClick={toggleMenu}></div>
                    :
                    null
                }
            </div>
            <Container>
                <Contents >
                    <List />
                </Contents>
            </Container>
        </div>
    )
}

function List() {
    return (
        <div className="togle-menu" style={{ marginTop: "20px" }}>
            <Link to={"/home"}>
                <li>HOME</li>
            </Link>
            <li>프로필</li>
            <li>포트폴리오</li>
            <hr style={{ margin: ".5rem", width: "6rem" }} />
            <Link to={"/board/list"}>
                <li>게시판</li>
            </Link >
        </div>
    )
}

const HeaderToggle = styled.div`
  position : fixed;
  z-index : 1001;

`

const Button = styled.img`

    @media(min-width : 812px) {
        display : none;
    }

    @media(max-width : 811px){
        width : 20px;
        height : 20px;
        position : absolute;
        top : 9px;
        left : 15px;
        border : none;
        background : none;
        z-index : 1000;
    }
`

const Container = styled.div`
    margin : 0 auto;
    font-size : 1.1em;
    display : flex;
    margin-top : 5rem;
    width: 100px;
    position : relative;

    @media(max-width : 811px) {
        display : none;
    }
`

const Contents = styled.div`
    margin-top : 10px;
    margin-left: 55px;
    height: 100%;
    width: 100%;
    display : flex;
    flex-direction: column;
    position : fixed;
`

export default LeftNav;