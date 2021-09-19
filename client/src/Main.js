/*eslint-disable*/
import './App.css';
import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import { Nav, Navbar, Col } from 'react-bootstrap';
import styled from 'styled-components';
import SignUp from './components/pages/SignUp';
import Login from './components/pages/Login';
import Home from './components/pages/Home';
import BoardWrite from './components/pages/BoardWrite';
import BoardModify from './components/pages/BoardModify';
import BoardList from './components/pages/BoardList';
import View from './components/pages/View';
import LeftNav from './components/modules/LeftNav';

function Main() {
  // 로그인 상태 관리
  const [isLogin, setIsLogin] = useState(false)

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

  useEffect(() => {
    if (sessionStorage.getItem('id') === null) {
      // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 없다면
      // console.log('isLogin ?? :: ', isLogin)
    } else {
      // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 있다면
      // 로그인 상태 변경
      setIsLogin(true)
      //console.log('isLogin ??? :: ', isLogin)
    }
  });

  //로그인 페이지 렌더링
  if (document.location.href == 'http://localhost:3000/login') {
    return (
      <Login />
    )
  }
  //회원가입 페이지 렌더링
  else if (document.location.href == 'http://localhost:3000/signup') {
    return (
      <SignUp />
    )
  }

  else
    return (
      <Container>
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark" style={{ zIndex: "999" }}>
          <Navbar.Brand>
            <Link to={"/home"} className="home-link">
              dmchoi
                </Link>
          </Navbar.Brand>
          {isLogin ?
            <Nav.Link onClick={onLogout}>
              Log out
                </Nav.Link>
            : <Nav.Link onClick={onLogin}>
              Log In
              </Nav.Link>
          }
        </Navbar>
        <Contents>
          <Col xs={1}>
            <LeftNav style={{ padding: "3rem" }}>
            </LeftNav>
          </Col>
          <Col xs={6}>
            <Route exact path="/" component={Home} />
            <Route exact path="/board/newpost" component={BoardWrite} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/board/list" component={BoardList} />
            <Route exact path="/board/view/:data" component={View} />
            <Route exact path="/board/modify/:data" component={BoardModify} />
          </Col>
        </Contents>
        <Footer>
          <div>Contact - minminnn11@daum.net</div>
          <div className="cr">Copyright©dmchoi 2021</div>
        </Footer>
      </Container >
    )
}
const Container = styled.div`
  width : 100%;
`

const Footer = styled.div`
  width: 100%;
  background-color: #0d6efd!important;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 30px 0;
  text-align: center;
  color: white;
  font-weight: 600;
`

const Contents = styled.div`
  width : 100%;
  padding-top : 3rem;
  display:flex;
  justify-content: center;
`


export default Main;
