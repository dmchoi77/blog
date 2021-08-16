import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

function SignUp() {

    const _signUp = async () => {
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

        const addUser = () => {
            axios.post('http://localhost:8000/api/signup', {
                name: userName,
                id: id,
                password: password,
                psw_check: psw_check
            }).then((res) => {
                if (res.data === "ER_DUP_ENTRY") return alert("이미 가입되어 있는 아이디 입니다.");
                else if (res.data === "complete") return alert("회원가입 완료");
            })
        };

        addUser();
        //document.location.href = '/';
    };



    return (
        <div>
            <div>
                <div>
                    <h3 id='signup_title'>회원가입</h3>
                </div>
                <div className='Signup'>
                    <div>
                        <div id='signup_section'>
                            {/* 이름 */}
                            <div>
                                <h5> 이름 </h5>
                                <input type='text' maxLength='10' name='signup_name' />
                            </div>
                            {/* 아이디 */}
                            <div>
                                <h5> 아이디 </h5>
                                <input type='text' maxLength='20' name='signup_id' />
                            </div>

                            {/* 비밀번호 */}
                            <div>
                                <h5> 비밀번호 </h5>
                                <input type='password' maxLength='15' name='signup_password' />
                            </div>

                            {/* 비밀번호 */}
                            <div>
                                <h5> 비밀번호 확인 </h5>
                                <input type='password' maxLength='15' name='signup_pswCheck' />
                            </div>
                        </div>
                        <button onClick={_signUp}>회원가입</button>
                        <button ><Link to="/">취소</Link></button>

                    </div>
                </div>
            </div>
        </div>
    )
};


export default SignUp;