/*eslint-disable*/
import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import SignUp from './components/pages/SignUp';
import Login from './components/pages/Login';
import Home from './components/pages/Home';
import BoardWrite from './components/pages/Board/BoardWrite';
import BoardModify from './components/pages/Board/BoardModify';
import BoardList from './components/pages/Board/BoardList';
import View from './components/pages/Board/BoardDetail/View';
import Header from './components/modules/Header';
import LeftNav from './components/modules/LeftNav';
import Footer from './components/modules/Footer';
import NotFound from './components/pages/NotFound';
import Portfolio from './components/pages/Portfolio';
import Auth from './hoc/auth';

function Main() {

  return (
    <>
      <Header/>
      <Container>
        <LeftNav />
        <Contents>
          <Switch>
            <Route exact path="/" component={Auth(Home,null)} />
            <Route exact path="/board/newpost" component={Auth(BoardWrite,true)} />
            <Route exact path="/home" component={Auth(Home,null)} />
            <Route exact path="/board/list" component={Auth(BoardList,null)} />
            <Route exact path="/board/view/:data" component={Auth(View,null)} />
            <Route exact path="/board/modify/:data" component={Auth(BoardModify,true)} />
            <Route exact path="/login" component={Auth(Login,false)} />
            <Route exact path="/signup" component={Auth(SignUp,null)} />
            <Route exact path="/portfolio" component={Auth(Portfolio,null)}/>
            <Route path="*" component={Auth(NotFound,null)} />
          </Switch>
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
