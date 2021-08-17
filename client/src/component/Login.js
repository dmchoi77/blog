import axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router-dom';

function Login() {

    const history = useHistory();
    const _login = () => {
        const id = document.getElementsByName('signup_id')[0].value.trim();
        const password = document.getElementsByName('signup_password')[0].value.trim();

    

       

        (() => {
            axios.post('http://localhost:8000/api/login', {
                id: id,
                password: password,
            }).then((res) => {
               
                
            })
        })()

    };

    return (
        <div>
            <div>
                <div>
                    <h3 id='signup_title'>로그인</h3>
                </div>
                <div className='Signup'>
                    <div>
                        <div id='signup_section'>
                            {/* 아이디 */}
                            <div>
                                <h5> 아이디 </h5>
                                <input type='text' maxLength='20' name='signup_id' placeholder="아이디를 입력해주세요"/>
                            </div>

                            {/* 비밀번호 */}
                            <div>
                                <h5> 비밀번호 </h5>
                                <input type='password' maxLength='15' name='signup_password' placeholder="비밀번호를 입력해주세요" />
                            </div>
                        </div>
                        <button onClick={_login}>로그인</button>
                        <button onClick={() => history.push("/")}>취소</button>
                    </div>
                </div>
            </div>
        </div >
    )
};


export default Login;