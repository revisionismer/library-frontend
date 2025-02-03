import React, { useEffect, useState } from 'react';

import '../assets/css/sign.css';

import axios from 'axios';

import { Link, Navigate, json, useLocation, useNavigate, useParams } from 'react-router-dom';

const SignUp = () => {

    const navigate = useNavigate();

    function signUp() {

        const username = document.getElementById('input-login-username').value;
        const password = document.getElementById('input-login-password').value;
        const password_chk = document.getElementById('input-login-password_chk').value;
        const name = document.getElementById('input-login-name').value;
        const phone = document.getElementById('input-login-phone').value;

        // 1-5. 이메일 형식 체크 정규식
        const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

        if (!email_regex.test(username)) {
            alert("이메일 형식에 맞지 않습니다.");
            document.getElementById("input-login-username").focus();
            return false;
        }

        if (password !== password_chk) {
            alert("비밀번호가 서로 다릅니다.");
            document.getElementById("input-login-password").value = '';
            document.getElementById("input-login-password_chk").value = '';
            document.getElementById("input-login-password").focus();
            return false;
        }

        if (name === '') {
            alert("이름은 비어있을 수 없습니다.");
            document.getElementById("input-login-name").focus();
            return false;
        }

        if (phone === '') {
            alert("전화번호는 비어있을 수 없습니다.");
            document.getElementById("input-login-phone").focus();
            return false;
        }

        var signUpObject = {
            username: username,
            password: password,
            name: name,
            phone: phone
        }

        console.log(signUpObject);

        axios.post('/api/auth/join',
            // 1-1. 첫번째 인자 값 : 서버로 보낼 데이터
            JSON.stringify(signUpObject),
            // 1-2. 두번째 인자값 : headers 에 세팅할 값들 ex) content-type, media 방식 등
            {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                }
            }
            // 1-3. 성공
        ).then(function (res) {
            console.log(res);
            alert(res.data.message);

            navigate("/signin");

            // 1-4. 실패
        }).catch(function (res) {
            console.log(res);
            if (res.response.status === 500) {
                alert(res.response.statusText);
                return;
            }

            if (res.response.data.message === '중복된 아이디입니다.') {
                alert(res.response.data.message);

                document.getElementById("span-login-username").style.display = 'block';
                document.getElementById("span-login-password").style.display = 'block';
                document.getElementById("span-login-password_chk").style.display = 'block';
                document.getElementById("span-login-name").style.display = 'block';
                document.getElementById("span-login-phone").style.display = 'block';

                document.getElementById("input-login-username").value = '';
                document.getElementById("input-login-password").value = '';
                document.getElementById("input-login-password_chk").value = '';
                document.getElementById("input-login-name").value = '';
                document.getElementById("input-login-phone").value = '';

                return;
            }

            if (res.data.username === "이메일 형식으로 적어주세요.") {
                alert(res.data.username);
                document.getElementById("span-login-username").style.display = 'block';
                document.getElementById("input-login-username").value = '';
                return;
            }


        })
    }


    useEffect(() => {

        const loginIdInput = document.querySelector('#input-login-username');
        const loginPwInput = document.querySelector('#input-login-password');
        const loginPwChkInput = document.querySelector('#input-login-password_chk');
        const loginNameInput = document.querySelector('#input-login-name');
        const loginPhoneInput = document.querySelector('#input-login-phone');

        const loginIdSpan = document.querySelector('#span-login-username');
        const loginPwSpan = document.querySelector('#span-login-password');
        const loginPwChkSpan = document.querySelector('#span-login-password_chk');
        const loginNameSpan = document.querySelector('#span-login-name');
        const loginPhoneSpan = document.querySelector('#span-login-phone');

        loginIdInput.addEventListener('click', () => {
            loginIdInput.classList.toggle('isTyping');

        });

        loginIdInput.addEventListener('focusout', () => {
            loginIdInput.classList.remove('isTyping');

            if (loginIdInput.value) {
                loginIdSpan.style.display = 'none';
            } else {
                loginIdSpan.style.display = 'block';
            }

        })

        loginPwInput.addEventListener('click', () => {
            loginPwInput.classList.toggle('isTyping');

        });

        loginPwInput.addEventListener('focusout', () => {
            loginPwInput.classList.remove('isTyping');

            if (loginPwInput.value) {
                loginPwSpan.style.display = 'none';
            } else {
                loginPwSpan.style.display = 'block';
            }
        })

        loginPwChkInput.addEventListener('click', () => {
            loginPwChkInput.classList.toggle('isTyping');

        });

        loginPwChkInput.addEventListener('focusout', () => {
            loginPwChkInput.classList.remove('isTyping');

            if (loginPwChkInput.value) {
                loginPwChkSpan.style.display = 'none';
            } else {
                loginPwChkSpan.style.display = 'block';
            }
        })

        loginNameInput.addEventListener('click', () => {
            loginNameInput.classList.toggle('isTyping');

        });

        loginNameInput.addEventListener('focusout', () => {
            loginNameInput.classList.remove('isTyping');

            if (loginNameInput.value) {
                loginNameSpan.style.display = 'none';
            } else {
                loginNameSpan.style.display = 'block';
            }
        })

        loginPhoneInput.addEventListener('click', () => {
            loginPhoneInput.classList.toggle('isTyping');

        });

        loginPhoneInput.addEventListener('focusout', () => {
            loginPhoneInput.classList.remove('isTyping');

            if (loginPhoneInput.value) {
                loginPhoneSpan.style.display = 'none';
            } else {
                loginPhoneSpan.style.display = 'block';
            }
        })

        // 회원 가입 버튼 누르면 페이지 이동
        const cancelSignUpBtn = document.querySelector('.cancel-button');

        cancelSignUpBtn.addEventListener('click', () => {
            location.href = "/home";
        });


    }, []);

    return (
        <div className='wrapper'>
            <div className='title-description'>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-book-half me-2" viewBox="0 0 16 16">
                    <path d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
                </svg>
                <span className="fs-4">BookMarket</span>
                <br /><br />
                <p>회원 가입</p>
            </div>

            <form id='sign-form'>
                <label className="login-input-container">
                    <span id='span-login-username'>이메일 형식의 아이디</span>
                    <input type="text" id="input-login-username" name='input-login-username' placeholder="" />
                    <i className="icon-cancel"></i>
                </label>

                <label className="login-input-container">
                    <span id='span-login-password'>비밀번호</span>
                    <input type="password" id="input-login-password" name='input-login-password' placeholder="" autoComplete='on' />
                    <i className="icon-cancel"></i>
                </label>

                <label className="login-input-container">
                    <span id='span-login-password_chk'>비밀번호 확인</span>
                    <input type="password" id="input-login-password_chk" name='input-login-password_chk' placeholder="" autoComplete='on' />
                    <i className="icon-cancel"></i>
                </label>

                <label className="login-input-container">
                    <span id='span-login-name'>이름</span>
                    <input type="text" id="input-login-name" name='input-login-name' placeholder="" autoComplete='on' />
                    <i className="icon-cancel"></i>
                </label>

                <label className="login-input-container">
                    <span id='span-login-phone'>전화번호</span>
                    <input type="text" id="input-login-phone" name='input-login-phone' placeholder="" autoComplete='on' />
                    <i className="icon-cancel"></i>
                </label>

                <button type="button" id="button-login" className="login-button" disabled="" onClick={() => signUp()}>가입하기</button>
                <button type="button" id="button-cancel" className="cancel-button" disabled="">취소하기</button>
            </form>

            <p className="corp">© BookMarket Corp.</p>

        </div>
    );
};

export default SignUp;