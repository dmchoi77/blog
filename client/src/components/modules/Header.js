import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
function Header(props) {

    const onLogout = () => {
        // sessionStorage 에 user_id 로 저장되어있는 아이템을 삭제한다.
        sessionStorage.removeItem('id')
        // App 으로 이동(새로고침)
        document.location.href = '/'
    }

    const onLogin = () => {
        // sessionStorage 에 user_id 로 저장되어있는 아이템을 삭제한다.
        sessionStorage.removeItem('id')
        // App 으로 이동(새로고침)
        document.location.href = '/login'
    }

    return (
        <Container>
            <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark" style={{ zIndex: "999", width: "1340px", margin: "0 auto", position: "fixed", top: 0, left: 0, right: 0 }}>
                <Navbar.Brand>
                    <Link to={"/home"} className="home-link">
                        dmchoi
                    </Link>
                </Navbar.Brand>
                {props.isLogin ?
                    <Nav.Link onClick={onLogout}>
                        Log out
                </Nav.Link>
                    :
                    <Nav.Link onClick={onLogin}>
                        Log In
                </Nav.Link>
                }
            </Navbar>
        </Container>
    )
}

const Container = styled.div`
    width : 100%;
    height : 62px;
    background-color: #0d6efd;
    position : fixed;
    z-index : 999;
`

export default Header;