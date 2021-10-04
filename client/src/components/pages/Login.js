import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';

function Login() {

    const [inputId, setInputId] = useState('');
    const [inputPw, setInputPw] = useState('');
    const history = useHistory();

    const handleInputId = (e) => {
        setInputId(e.target.value);
    }

    const handleInputPw = (e) => {
        setInputPw(e.target.value);
    }

    const _login = () => {
        //만약 로그인 정보가 이미 있으면 삭제
        if (sessionStorage.getItem('id')) {
            sessionStorage.removeItem('id')
        }
        axios.post('http://localhost:8000/api/login', null, {
            params: {
                id: inputId,
                password: inputPw
            }
        }).then((res) => {
            //console.log(res);
            if (res.data.id === undefined) {
                //console.log('======================', res.data.msg);
                if (res.data.msg === "비밀번호가 일치하지 않습니다.") alert("비밀번호가 일치하지 않습니다.");
                else if (res.data.msg === "일치하는 id가 없습니다.") alert('일치하는 아이디가 존재하지 않습니다.');

            } else if (res.data.id === inputId) {
                // id, pw 모두 일치 userId = userId1, msg = undefined
                console.log('======================', '로그인 성공');
                sessionStorage.setItem('id', inputId); //로그인 성공하면 세션스토리지에 정보저장
                document.location.href = '/home';
            }
            //작업 완료 되면 페이지 이동(새로고침)
        }).catch()
    }

    return (
        <Container>
            <Title>dmchoi</Title>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control className="form" type="text" name='input_id' value={inputId} onChange={handleInputId} placeholder="아이디" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control className="form" type='password' name='input_pw' value={inputPw} onChange={handleInputPw} placeholder="비밀번호" />
                </Form.Group>
                <Button className="loginBtn" variant="primary" type='button' onClick={_login}>
                    로그인
                </Button>
                <SignUp>처음이면 <Link to={"/signup"} style={{ color: "#004282" }}>회원가입</Link></SignUp>
            </Form>
        </Container>
    )
}

const Container = styled.div`
    margin-top: 170px;
    height: 280px;
    position: absolute;
    left: 50%;
    margin-left: -180px;
    width: 360px;

    @media(max-width : 811px) {
        margin-top: 20px;
        padding: 5rem;
    }
`
const Title = styled.h1`
    text-align : center;
    font-weight : bold;
    margin-bottom : 1rem;
`

const SignUp = styled.p`
    text-align: center;
    padding-top: 20px;
    font-weight:bolder;
`

export default Login;
