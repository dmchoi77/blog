import "./App.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import SignUp from "./components/pages/SignUp";
import Login from "./components/pages/Login";
import Home from "./components/pages/Home";
import PostWrite from "./components/pages/Post/PostWrite";
import PostModify from "./components/pages/Post/PostModify";
import PostList from "./components/pages/Post/PostList";
import PostContent from "./components/pages/Post/PostDetail/PostContent";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFound from "./components/pages/NotFound";
import Search from "./components/pages/Search";
import Auth from "./hoc/auth";

function Main() {
  return (
    <>
      <Header />
      <Container>
        <Contents>
          <Switch>
            <Route exact path="/" component={Auth(Home, null)} />
            <Route
              exact
              path="/post/newpost"
              component={Auth(PostWrite, true)}
            />
            <Route exact path="/post/list" component={Auth(PostList, null)} />
            <Route
              exact
              path="/post/view/:data"
              component={Auth(PostContent, null)}
            />
            <Route
              exact
              path="/post/modify/:data"
              component={Auth(PostModify, true)}
            />
            <Route exact path="/login" component={Auth(Login, false)} />
            <Route exact path="/signup" component={Auth(SignUp, null)} />
            <Route exact path="/search" component={Auth(Search, null)} />
            <Route path="*" component={Auth(NotFound, null)} />
          </Switch>
        </Contents>
      </Container>
      <Footer />
    </>
  );
}

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  // @media(max-width : 811px) {
  //   width : 100vw;
  // }
`;

const Contents = styled.div`
  margin: 0 auto;
  margin-top: 50px;
  min-height: 700px;
  width: 100%;

  // @media(max-width : 811px) {
  //   width : 100vw;
  //   padding : 20px;
  //   margin : 25px auto;
  // }
`;

export default Main;
