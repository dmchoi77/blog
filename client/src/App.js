import './App.css';
import React, { useState, useEffect } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { Nav, Navbar, Container, Row, Col, Card } from 'react-bootstrap';
import SignUp from './component/SignUp';
import Login from './component/Login';
import Home from './component/Home';
import PrivateRoute from './component/PrivateRoute';
import BoardWrite from './component/BoardWrite';
import BoardModify from './component/BoardModify';
import BoardList from './component/BoardList';
import View from './component/View';

function App() {
  // 로그인 상태 관리
  const [isLogin, setIsLogin] = useState(false)

  const onLogout = () => {
    // sessionStorage 에 user_id 로 저장되어있는 아이템을 삭제한다.
    sessionStorage.removeItem('id')
    // App 으로 이동(새로고침)
    document.location.href = '/'
  }

  useEffect(() => {
    if (sessionStorage.getItem('id') === null) {
      // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 없다면
      console.log('isLogin ?? :: ', isLogin)
    } else {
      // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 있다면
      // 로그인 상태 변경
      setIsLogin(true)
      console.log('isLogin ??? :: ', isLogin)
    }
  });

  return (
    <div>
      {isLogin
        ? <div>
          <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
            <Container>
              <Navbar.Brand><Link to={"/home"} className="home-link">dmchoi</Link></Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav.Link onClick={onLogout}>Log out</Nav.Link>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <Container>

            <Row>
              <Col className="category">
                <Card.Body>
                <Card.Header as="h5">Category</Card.Header>
                  <Card.Text>
                    <li><Link to={"/board/list"} className="link">리액트</Link></li>
                    <li><Link to={"/board/list"} className="link">자바스크립트</Link></li>
                    <li><Link to={"/board/list"} className="link">데이터베이스</Link></li>
                  </Card.Text>
                </Card.Body>
              </Col>
              <Col xs={10}>
                <Switch>
                  {/* <PrivateRoute exact path="/home" component={Home} /> */}
                  <PrivateRoute exact path="/board/list" component={BoardList} />
                  <PrivateRoute exact path="/board/newpost" component={BoardWrite} />
                  <PrivateRoute exact path="/board/view/:data" component={View} />
                  <PrivateRoute exact path="/board/modify/:data" component={BoardModify} />
                </Switch>
              </Col>
            </Row>
          </Container>
          <div className="footer">
            <div className="cr">
              copyright©dmchoi
          </div>
          </div>
        </div>
        : <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      }
    </div>
  )
}

export default App;
