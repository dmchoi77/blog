import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../actions/user_action';

function SignUp() {

    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [pwd, setPwd] = useState('');
    const [pwdCheck, setPwdCheck] = useState('');

    const dispatch = useDispatch();

    const nameHandler = (e) => {
        setName(e.target.value.trim());
    }

    const idHandler = (e) => {
        setId(e.target.value.trim());
    }

    const pwdHandler = (e) => {
        setPwd(e.target.value.trim());
    }

    const pwdCheckHandler = (e) => {
        setPwdCheck(e.target.value.trim());
    }

    const history = useHistory();

    const loginHandler = (e) => {
        e.preventDefault();

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

        let body = {
            name: name,
            id: id,
            pwd: pwd
        }

        dispatch(registerUser(body))
            .then(res => {
                if (res.payload.success) {
                    alert("회원가입에 성공했습니다.");
                    history.push('/login');
                } else {
                    alert("회원가입에 실패했습니다.")
                }
                return
            })
    }

    return (
        <Container>
            <Title>회원가입</Title>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control className="form" type='text' maxLength='10' name='signup_name' placeholder="이름" onChange={nameHandler} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control className="form" type='text' maxLength='20' name='signup_id' placeholder="아이디" onChange={idHandler} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control className="form" type='password' maxLength='15' name='signup_password' placeholder="비밀번호" onChange={pwdHandler} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control className="form" type='password' maxLength='15' name='signup_pswCheck' placeholder="비밀번호 확인" onChange={pwdCheckHandler} />
            </Form.Group>
            <Button className="signupBtn" variant="primary" type='button' onClick={loginHandler}>
                회원가입
            </Button>
            <Button className="backBtn" variant="primary" type='button' style={{ marginTop: "1.0rem" }} onClick={() => { history.goBack() }}>
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

    @media(max-width : 811px) {
        margin-top: 20px;
        padding: 5rem;
    }
`
const Title = styled.h1`
    font-weight : bold;
    margin-bottom : 1rem;
    text-align : center;
`


export default SignUp;