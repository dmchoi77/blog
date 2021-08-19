import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
            if (res.data.id === undefined) {
                //console.log('======================', res.data.msg);
                if (res.data.msg === "비밀번호가 일치하지 않습니다.") alert("비밀번호가 일치하지 않습니다.");
                else if(res.data.msg === "일치하는 id가 없습니다.") alert('일치하는 아이디가 존재하지 않습니다.');

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
        <div id="container">

            <h1>블로그야</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="text" name='input_id' value={inputId} onChange={handleInputId} placeholder="아이디" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type='password' name='input_pw' value={inputPw} onChange={handleInputPw} placeholder="비밀번호" />
                </Form.Group>
                <Button variant="primary" type='button' onClick={_login}>
                    로그인
                </Button>
                <p className="sign-up">처음이면 <Link to={"/signup"}>회원가입</Link></p>
            </Form>
        </div>
    )
};


export default Login;
