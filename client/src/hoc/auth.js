import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth, logoutUser } from "../actions/user_action";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (SpecificComponent, option, adminRoute = null) {
  //option
  //null : 아무나 접근 가능한 페이지
  //true : 로그인한 유저만 접근 가능한 페이지
  //false : 로그인한 유저는 접근 불가능한 페이지

  function AuthenticationCheck(props) {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(auth()).then((response) => {
        console.log(response);
        const token = localStorage.getItem("x_auth");
        // 임의로 로컬스토리지의 토큰을 제거했을 경우 => 로그아웃
        if (response.payload.isAuth && !token) {
          logoutUser();
          return;
        }
        // 토근 만료됐을 경우 => 로컬스토리지에 저장된 토큰 제거
        if (!response.payload.isAuth && token) {
          localStorage.removeItem("x_auth");
          return;
        }

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
