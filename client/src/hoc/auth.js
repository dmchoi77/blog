import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../actions/user_action";

export default function (SpecificComponent, option, adminRoute = null) {
  //option
  //null : 아무나 접근 가능한 페이지
  //true : 로그인한 유저만 접근 가능한 페이지
  //false : 로그인한 유저는 접근 불가능한 페이지

  function AuthenticationCheck(props) {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then((response) => {
        if (response.payload.isAuth) {
          const token = localStorage.getItem("x_auth");
          const expire = JSON.parse(token).expire;

          // 토큰 시간 만료되면 localStorage에서 제거
          if (Date.now() > expire && token) {
            localStorage.removeItem("x_auth");
            window.location.reload();
          }
        }

        console.log(response);
        if (!response.payload.isAuth) {
          if (option) {
            props.history.push("/login");
          }
        } else {
          if (adminRoute && !response.payload.isAdmin) {
            props.history.push("/");
          } else {
            if (option === false) props.history.push("/");
          }
        }
      });
    }, [dispatch, props.history.push, props.history]);

    return <SpecificComponent {...props} />;
  }
  return AuthenticationCheck;
}
