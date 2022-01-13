import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../actions/user_action";
import SEO from "../modules/SEO";

function Login() {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const dispatch = useDispatch();

  const idHandler = (e) => {
    setId(e.target.value);
  };

  const passwordHandler = (e) => {
    setPwd(e.target.value);
  };

  const loginHandler = (e) => {
    e.preventDefault();
    let body = {
      id,
      pwd,
    };

    dispatch(loginUser(body)).then((res) => {
      if (
        !res.payload.loginSuccess ||
        res.payload.message === "해당하는 아이디가 없습니다."
      ) {
        alert("아이디와 비밀번호를 확인해 주세요.");
        return;
      }

      if (res.payload.loginSuccess) {
        // cookie.save("x_auth", res.payload.token);
        localStorage.removeItem("x_auth");
        localStorage.setItem("x_auth", res.payload.token);
        window.location.replace("/");
      }
    });
  };

  return (
    <Container>
      <SEO title={"로그인"} description={"dmchoi 블로그입니다."} />
      <Title>dmchoi</Title>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            className="form"
            type="text"
            name="input_id"
            value={id}
            onChange={idHandler}
            placeholder="아이디"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            className="form"
            type="password"
            name="input_pw"
            value={pwd}
            onChange={passwordHandler}
            placeholder="비밀번호"
          />
        </Form.Group>
        <Button
          className="loginBtn"
          variant="primary"
          type="button"
          onClick={loginHandler}
        >
          로그인
        </Button>
        <SignUp>
          처음이면{" "}
          <Link to={"/signup"} style={{ color: "#004282" }}>
            회원가입
          </Link>
        </SignUp>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 170px;
  height: 280px;
  position: absolute;
  left: 50%;
  margin-left: -180px;
  width: 360px;

  @media (max-width: 811px) {
    margin-top: 20px;
    padding: 5rem;
  }
`;
const Title = styled.h1`
  text-align: center;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const SignUp = styled.p`
  text-align: center;
  padding-top: 20px;
  font-weight: bolder;
`;

export default Login;
