/*eslint-disable*/
import './App.css';
import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import SignUp from './components/pages/SignUp';
import Login from './components/pages/Login';
import Home from './components/pages/Home';
import BoardWrite from './components/pages/BoardWrite';
import BoardModify from './components/pages/BoardModify';
import BoardList from './components/pages/BoardList';
import View from './components/pages/View';
import Header from './components/modules/Header';
import LeftNav from './components/modules/LeftNav';
import Footer from './components/modules/Footer';

function Main() {
  // 로그인 상태 관리
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('id') === null) {
      // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 없다면
    } else {
      // sessionStorage 에 user_id 라는 key 값으로 저장된 값이 있다면
      // 로그인 상태 변경
      setIsLogin(true)
    }
  });

    return (
      <>
        <Header isLogin={isLogin}/>
        <Container>
          <LeftNav/>
          <Contents>
            <Route exact path="/" component={Home} />
            <Route exact path="/board/newpost" component={BoardWrite} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/board/list" component={BoardList} />
            <Route exact path="/board/view/:data" component={View} />
            <Route exact path="/board/modify/:data" component={BoardModify} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
          </Contents>
        </Container >
        <Footer />
      </>
    )
}

const Container = styled.div`
  width : 1340px;
  display: flex;
  margin : 0 auto;
  display : flex;
  justify-content : center;

  @media(max-width : 811px) {
    width : 100vw;
  }
`

const Contents = styled.div`
  margin : 0 150px;
  margin-top : 50px;
  min-height : 700px;
  width : 1040px;
  z-index : 1;

  @media(max-width : 811px) {
    width : 100vw;
    padding : 20px;
    margin : 25px auto;
  }
`

export default Main;
