import React, { useEffect, useState } from 'react';

import '../assets/css/sign.css';
import { Link, Navigate, json, useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const SignIn = () => {

    const navigate = useNavigate();

    var ACCESS_TOKEN = "";

    function login() {
        const username = document.getElementById('input-login-username').value;
        const password = document.getElementById('input-login-password').value;

        var loginObject = {
            username: username,
            password: password
        }

        console.log(loginObject)

        axios.post('/login',
            // 1-1. 첫번째 인자 값 : 서버로 보낼 데이터
            JSON.stringify(loginObject),
            // 1-2. 두번째 인자값 : headers 에 세팅할 값들 ex) content-type, media 방식 등
            {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                }
            }
        ).then(function (res) {
            console.log(res);

            // 1-3. response에서 가져온 값을 string으로 만들기 위해 앞에 "" 붙임
            var responseHeader = "" + res.headers.get('authorization');

            ACCESS_TOKEN = responseHeader.substring(7);

            console.log("엑세스 토큰 : " + ACCESS_TOKEN);

            navigate("/home");

        }).catch(function (res) {
            console.log(res);
            if (res.response.status === 500) {
                alert(res.response.statusText);
                return;
            }

            alert(res.response.data.message);
            return;
        })

    }

    // 2024-12-24 : 로그인 페이지 마크업
    useEffect(() => {

        const loginIdInput = document.querySelector('#input-login-username');
        const loginPwInput = document.querySelector('#input-login-password');
        const loginIdSpan = document.querySelector('#span-login-username');
        const loginPwSpan = document.querySelector('#span-login-password');

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
        });


        // 회원 가입 버튼 누르면 페이지 이동
        const signupBtn = document.querySelector('.btn-signup-login');

        signupBtn.addEventListener('click', () => {
            location.href = "/signup";
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
                <p>로그인</p>
            </div>

            <form id='sign-form'>
                <label className="login-input-container">
                    <span id='span-login-username'>아이디 또는 이메일</span>
                    <input type="text" id="input-login-username" />
                    <i className="icon-cancel"></i>
                </label>

                <label className="login-input-container">
                    <span id='span-login-password'>비밀번호</span>
                    <input type="password" id="input-login-password" autoComplete='on' />
                    <i className="icon-cancel"></i>
                </label>
                <button type="button" id="button-login" className="login-button" disabled="" onClick={() => login()}>로그인</button>
            </form>

            <div className="signup-login-container">
                <button type="button" className="btn-signup-login">
                    회원 가입
                </button>
            </div>
            <div className="sns-login-container">
                <strong className="sns-login-title">
                    <span>
                        SNS 계정으로 로그인
                    </span>
                </strong>
                <ul className="sns-login-list">
                    <li>
                        <button className="btn-sns-login btn-kakao-login" aria-label="카카오 로그인">
                            <i className="icon-sns icon-kakao"></i>
                        </button>
                    </li>
                    <li>
                        <button className="btn-sns-login" id="naverIdLogin_loginButton" aria-label="네이버 로그인">
                            <i className="icon-sns icon-naver"></i>
                        </button>
                    </li>
                    <li>
                        <button className="btn-sns-login btn-facebook-login" aria-label="facebook 로그인">
                            <i className="icon-sns icon-facebook"></i>
                        </button>
                    </li>
                </ul>
            </div>
            <p className="corp">© BookMarket Corp.</p>

        </div>
    );
};

export default SignIn;