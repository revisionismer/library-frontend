import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Base64 from 'base-64';

import { Link, Navigate, json, useLocation, useNavigate, useParams } from 'react-router-dom';


import { Dropdown } from 'react-bootstrap';

import '../assets/css/layout/header.css';

const Header = () => {
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

        console.log(loginUser);
    }

    function logout() {

        axios.get('/api/auth/logout',
            // 1-1. 첫번째 인자 값 : 서버로 보낼 데이터
            null,
            // 1-2. 두번째 인자값 : headers 에 세팅할 값들 ex) content-type, media 방식 등
            {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                }
            }
        ).then(function (res) {
            console.log(res);

            deleteCookie('access_token');

            navigate("/signin");

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

    function deleteCookie(key) {
        document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    return (
        <>
            <header className="py-3 mb-4 border-bottom">
                <div className="container d-flex flex-wrap justify-content-center align-items-center">
                    <Link to="/BookMarket/home" className="d-flex align-items-center link-body-emphasis text-body-emphasis text-decoration-none mb-3 mb-lg-0 me-lg-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-book-half me-2" viewBox="0 0 16 16">
                            <path d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
                        </svg>
                        <span className="fs-4">BookMarket</span>
                    </Link>
                    <Dropdown>
                        <Dropdown.Toggle variant="none">
                            도서목록
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="/BookMarket/books">전체도서</Dropdown.Item>
                            <Dropdown.Item href="/BookMarket/books/IT전문서">IT전문서</Dropdown.Item>
                            <Dropdown.Item href="/BookMarket/books/IT교육교재">IT교육교재</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    &nbsp;| &nbsp;

                    {ACCESS_TOKEN != null && loginUser.role === 'ADMIN' ?
                        <Link to="/BookMarket/books/add" className="nav-link">도서등록 &nbsp;| &nbsp;</Link>
                        :
                        ''
                    }
                    {ACCESS_TOKEN != null ?
                        <Link to="/BookMarket/cart" className="nav-link">장바구니 &nbsp;| &nbsp;</Link>
                        :
                        ''
                    }
                    {ACCESS_TOKEN != null ?
                        <Link to="/BookMarket/order/list" className="nav-link">주문목록 &nbsp; | &nbsp;</Link>
                        :
                        ''
                    }
                    {ACCESS_TOKEN != null ?
                        <Link to="/BookMarket/board/list" className="nav-link">게시판 &nbsp;| &nbsp;</Link>
                        :
                        ''
                    }
                    {ACCESS_TOKEN != null ?
                        <Link to="/BookMarket/members/1/update" className="nav-link">회원수정 &nbsp;| &nbsp;</Link>
                        :
                        <Link to="/signup" className="nav-link">회원가입 &nbsp;| &nbsp;</Link>
                    }
                    {ACCESS_TOKEN != null ?
                        <Link to="/BookMarket/logout" className="nav-link" onClick={() => logout()}>로그아웃 &nbsp;| &nbsp;</Link>
                        :
                        <Link to="/signin" className="nav-link">로그인 &nbsp;| &nbsp;</Link>
                    }
                    {ACCESS_TOKEN != null ?
                        <b><span>{loginUser.username}</span></b>
                        :
                        ''
                    }

                </div>
            </header>
        </>
    );
};

export default Header;