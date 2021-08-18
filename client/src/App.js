import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import SignUp from './component/SignUp';
import Login from './component/Login';
import Home from './component/Home';
import PrivateRoute from './component/PrivateRoute';

function App() {
  // 로그인 상태 관리
  const [isLogin, setIsLogin] = useState(false)

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
      {isLogin ?
        <Home /> :
        <Login />
      }
      <Switch>
        {/* <PrivateRoute exact path="/home" component={Home} /> */}
        <Route exact path="/login" component={Login} />
        {/* <Route exact path="/" component={Login} /> */}
        <Route exact path="/signup" component={SignUp} />


      </Switch>
    </div>
  )
}

export default App;
