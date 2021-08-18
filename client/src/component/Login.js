import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Route, Link } from 'react-router-dom';
import SignUp from './SignUp';

function Login() {

    const [inputId, setInputId] = useState('');
    const [inputPw, setInputPw] = useState('');

    const handleInputId = (e) => {
        setInputId(e.target.value);
    }

    const handleInputPw = (e) => {
        setInputPw(e.target.value);
    }

    const _login = () => {

        axios.post('http://localhost:8000/api/onLogin', null, {
            params: {
                id: inputId,
                password: inputPw
            }
        }).then((res) => {
            console.log(res);
            if (res.data.userId === undefined) {
                // id 일치하지 않는 경우 userId = undefined, msg = '입력하신 id 가 일치하지 않습니다.'
                console.log('======================', res.data.msg)
                alert('Id or password you entered is incorrect.');
            } else if (res.data.userId === null) {
                // id는 있지만, pw 는 다른 경우 userId = null , msg = undefined
                console.log('======================', '입력하신 비밀번호가 일치하지 않습니다.')
                alert('The password you entered is incorrect.');
            } else if (res.data.userId === inputId) {
                // id, pw 모두 일치 userId = userId1, msg = undefined
                console.log('======================', '로그인 성공');
                sessionStorage.setItem('id', inputId)
            }
            //작업 완료 되면 페이지 이동(새로고침)
            document.location.href = '/home'
        }).catch()
    }

    return (
        <div id="container">

            <h1>블로그야</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="text" name='input_id' value={inputId} onChange={handleInputId} placeholder="아이디" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type='password' name='input_pw' value={inputPw} onChange={handleInputPw} placeholder="비밀번호" />
                </Form.Group>
                <Button className="submit-btn" variant="primary" type='button' onClick={_login}>
                    로그인
                </Button>
                <p className="sign-up">처음이면 <Link to={"/signup"}>회원가입</Link></p>
            
            </Form>

        </div>
    )
};


export default Login;