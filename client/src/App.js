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
      {isLogin //로그인한 경우
        ? <div>
          <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
            <Container>
              <Navbar.Brand>
                <Link to={"/home"} className="home-link">
                  dmchoi
                </Link>
              </Navbar.Brand>
              <Nav.Link onClick={onLogout}>
                Log out
              </Nav.Link>
            </Container>
          </Navbar>
          <Container>
            <Row>
              <Col className="category">
                <Card.Body>
                  <Card.Header as="h5">Categories</Card.Header>
                  <Card.Text>
                    <li><Link to={"/board/list"} className="link">Board</Link></li>
                  </Card.Text>
                </Card.Body>
              </Col>
              <Col xs={10}>
                <Switch>
                  <>
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/board/list" component={BoardList} />
                    <Route exact path="/board/newpost" component={BoardWrite} />
                    <Route exact path="/board/view/:data" component={View} />
                    <Route exact path="/board/modify/:data" component={BoardModify} />
                  </>
                </Switch>
              </Col>
            </Row>
          </Container>
          <div className="footer">
            <div>CONTACT : minminnn11@hanmail.net</div>
            <div className="cr">copyright©dmchoi 2021</div>
          </div>
        </div> //로그인안한 경우
        : <Switch>
          <>
            <PrivateRoute exact path="/home" component={Home} />
            <PrivateRoute exact path="/board/list" component={BoardList} />
            <PrivateRoute exact path="/board/newpost" component={BoardWrite} />
            <PrivateRoute exact path="/board/view/:data" component={View} />
            <PrivateRoute exact path="/board/modify/:data" component={BoardModify} />
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
          </>
        </Switch>
      }
    </div>
  )
}

export default App;
