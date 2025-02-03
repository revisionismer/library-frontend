import React, { useEffect, useState } from 'react';

import '../assets/css/home.css';

import axios from 'axios';

import Base64 from 'base-64';

import { Link, Navigate, json, useLocation, useNavigate, useParams } from 'react-router-dom';


const Home = () => {

    const navigate = useNavigate();

    var ACCESS_TOKEN = getCookie('access_token');

    function getCookie(key) {

        let result = null;
        let cookie = document.cookie.split(';');

        cookie.some(function (item) {
            item = item.replace(' ', '');

            let dic = item.split('=');

            if (key === dic[0]) {
                result = dic[1];
                return true;
            }
            return false;
        });
        return result;
    }

    // 2024-07-17 : base64로 로그인 정보 꺼내오기
    // 2024-07-18 : 토큰이 없다면 서버에서 예외터지도록 변경
    let payload;
    let loginUser;

    if (ACCESS_TOKEN != null) {
        payload = ACCESS_TOKEN.substring(ACCESS_TOKEN.indexOf('.') + 1, ACCESS_TOKEN.lastIndexOf('.'));
        loginUser = JSON.parse(Base64.decode(payload));
    }

    return (
        <>
            <div className='container'>
                <div className='home'>
                    <div className='p-5 mb-4 bg-body-tertiary rounded-3'>
                        <div className='container-fluid py-5'>
                            <h1 className='display-5 fw-bold'>도서 쇼핑몰에 오신 것을 환영합니다</h1>
                            <p className='col-md-8 fs-4'>BookMarket</p>
                        </div>
                    </div>

                    <div className='row align-items-md-stretch text-center'>
                        <div className='col-md-12'>
                            <div className='h-100 p-5'>
                                <h2>Welcome to Web Market!</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;