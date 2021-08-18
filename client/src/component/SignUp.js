import axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

function SignUp() {

    const history = useHistory();
    const _signUp = () => {
        const userName = document.getElementsByName('signup_name')[0].value.trim();
        const id = document.getElementsByName('signup_id')[0].value.trim();
        const password = document.getElementsByName('signup_password')[0].value.trim();
        const psw_check = document.getElementsByName('signup_pswCheck')[0].value.trim();

        const eng_check = /^[a-z]+[a-z0-9]{5,19}$/g;
        const pw_check = /^[a-z]+[a-z0-9]{5,19}$/g;

        if (!eng_check.test(id)) {
            return alert('아이디는 영문자로 시작하는 6~20자여야만 합니다.')
        }

        if (!pw_check.test(password)) {
            return alert('비밀번호는 영문자로 시작하는 6~20자여야만 합니다.')

        } else if (password !== psw_check) {
            return alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.')
        }

        (() => {
            axios.post('http://localhost:8000/api/signup', {
                name: userName,
                id: id,
                password: password,
                psw_check: psw_check
            }).then((res) => {
                if (res.data === "ER_DUP_ENTRY") return alert("이미 가입되어 있는 아이디 입니다.");
                else if (res.data === "complete") {
                    alert("회원가입 완료");
                    return history.push('/');
                }
            })
        })();

    };

    return (
        <div id="container">
            <h1>회원가입</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type='text' maxLength='10' name='signup_name' placeholder="이름" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type='text' maxLength='20' name='signup_id' placeholder="아이디" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type='password' maxLength='15' name='signup_password' placeholder="비밀번호" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type='password' maxLength='15' name='signup_pswCheck' placeholder="비밀번호 확인" />
            </Form.Group>
            <Button variant="primary" type='button' onClick={_signUp}>
                회원가입
            </Button>
        </div >
    )
};


export default SignUp;