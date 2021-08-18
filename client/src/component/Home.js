import React, { useState, useEffect } from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import BoardWrite from './BoardWrite';
import BoardList from './BoardList';
import SignUp from './SignUp';
import Login from './Login';
import View from './View';


function Home(props) {

  // App 컴포넌트에서 전달받은 props 값은 아래와 같이 받아온다.
  const isLogin = props.isLogin
  const onLogout = () => {
    // sessionStorage 에 user_id 로 저장되어있는 아이템을 삭제한다.
    sessionStorage.removeItem('id')
    // App 으로 이동(새로고침)
    document.location.href = '/'
  }

  return (
    <div>
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
          <Container>
            <Navbar.Brand href="/home">My Blog</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link><Link to={"/board/list"} className="link">Board</Link></Nav.Link>
              </Nav>
              <Nav.Link onClick={onLogout}>로그아웃</Nav.Link>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Switch>
          <PrivateRoute exact path="/board/list" component={BoardList} />
          <PrivateRoute exact path="/board/write" component={BoardWrite} />
          <PrivateRoute exact path="/board/view/:data" component={View} />
          <PrivateRoute exact path="board/write" component={BoardWrite} />
        </Switch>
    </div>
  )
}

export default Home;