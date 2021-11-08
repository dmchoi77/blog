import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import { List } from './LeftNav';
import { useSelector } from "react-redux";

function Header() {
    const [toggle, setToggle] = useState(null);
    const user = useSelector(state => state.user)
    const history = useHistory();

    const onLogout = () => {
        axios.get('/api/user/logout')
            .then(res => {
                if (res.status === 200) {
                    history.push('/login');
                } else {
                    alert("로그아웃 실패");
                }
            })
    }

    const onLogin = () => {
        // App 으로 이동(새로고침)
        history.push('/login');
    }

    const toggleMenu = () => {
        setToggle(!toggle);
    }

    return (
        <Container>
            <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark" style={{ zIndex: "999", width: "1340px", margin: "0 auto", position: "fixed", top: 0, left: 0, right: 0 }}>
                <HeaderToggle className="Header-Toggle" onClick={toggleMenu}>
                    <Button src="/img/menu.png"></Button>
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
                </HeaderToggle>
                <Navbar.Brand>
                    <Link to={"/home"} className="home-link">
                        dmchoi
                    </Link>
                </Navbar.Brand>
                {user.userData && !user.userData.isAuth ?
                    < Nav.Link onClick={onLogin}>
                        Log In
              </Nav.Link>
                    :
                    <Nav.Link onClick={onLogout}>
                        Log out
                    </Nav.Link>
                }
            </Navbar>
        </Container >
    )
}


const Container = styled.div`
    width : 100%;
    height : 62px;
    background-color: #0d6efd;
    position : fixed;
    z-index : 999;

    @media(max-width : 811px) {
        height : 1vw;   
    }
`

const HeaderToggle = styled.div`
    position : fixed;
    z-index : 1001;
    left : -5px;
`

const Button = styled.img`

    @media(min-width : 812px) {
        display : none;
    }

    @media(max-width : 811px){
        width : 19px;
        height : 19px;
        position : absolute;
        top : -8px;
        left : 15px;
        border : none;
        background : none;
        z-index : 1000;
    }
`

export default Header;