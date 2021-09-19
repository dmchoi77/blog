import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import styled from 'styled-components';

function SignUp() {

    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [pwd, setPwd] = useState('');
    const [pwdCheck, setPwdCheck] = useState('');

    const handleInputName = (e) => {
        setName(e.target.value.trim());
    }

    const handleInputId = (e) => {
        setId(e.target.value.trim());
    }

    const handleInputPwd = (e) => {
        setPwd(e.target.value.trim());
    }

    const handleInputPwdCheck = (e) => {
        setPwdCheck(e.target.value.trim());
    }

    const history = useHistory();

    const _signUp = () => {

        const eng_check = /^[a-z]+[a-z0-9]{5,19}$/g;
        const pw_check = /^[a-z]+[a-z0-9]{5,19}$/g;

        if (!eng_check.test(id)) {
            return alert('아이디는 영문자로 시작하는 6~20자여야만 합니다.')
        }

        if (!pw_check.test(pwd)) {
            return alert('비밀번호는 영문자로 시작하는 6~20자여야만 합니다.')

        } else if (pwd !== pwdCheck) {
            return alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.')
        }

        (() => {
            axios.post('http://localhost:8000/api/signup', {
                name: name,
                id: id,
                password: pwd,
                psw_check: pwdCheck
            }).then((res) => {
                if (res.data === "ER_DUP_ENTRY") return alert("이미 가입되어 있는 아이디 입니다.");
                else if (res.data === "complete") {
                    alert("회원가입 완료");
                    return history.push('/');
                }
            })
        })();

    }

    return (
        <Container>
            <Title>회원가입</Title>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type='text' maxLength='10' name='signup_name' placeholder="이름" onChange={handleInputName} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type='text' maxLength='20' name='signup_id' placeholder="아이디" onChange={handleInputId} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type='password' maxLength='15' name='signup_password' placeholder="비밀번호" onChange={handleInputPwd} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type='password' maxLength='15' name='signup_pswCheck' placeholder="비밀번호 확인" onChange={handleInputPwdCheck} />
            </Form.Group>
            <Button variant="primary" type='button' onClick={_signUp}>
                회원가입
            </Button>
            <Button variant="primary" type='button' style={{ marginTop: "1.0rem" }} onClick={() => { history.goBack() }}>
                뒤로 가기
            </Button>
        </Container>
    )
};

const Container = styled.div`
    margin-top: 170px;
    height: 280px;
    position: absolute;
    left: 50%;
    margin-left: -180px;
    width: 360px;
`
const Title = styled.h1`
    font-weight : bold;
    margin-bottom : 1rem;
`


export default SignUp;