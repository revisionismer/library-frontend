import React, { useEffect, useState } from 'react';
import { Link, Navigate, json, useLocation, useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

import Base64 from 'base-64';

import none from '../../assets/img/none.gif';

import '../../assets/css/order/orderFinished.css';

const OrderFinished = () => {
    const navigate = useNavigate();

    const { state } = useLocation();

    const { id } = useParams();

    const { IMP } = window;

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
    let userId;

    if (ACCESS_TOKEN != null) {
        payload = ACCESS_TOKEN.substring(ACCESS_TOKEN.indexOf('.') + 1, ACCESS_TOKEN.lastIndexOf('.'));
        loginUser = JSON.parse(Base64.decode(payload));
        userId = loginUser.id;
    }

    function deleteCookie(key) {
        document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    // 2025-04-19 : 여기까지
    const [orderId, setOrderId] = useState();
    const [orderFinishedDtos, setOrderFinishedDtos] = useState([])

    useEffect(() => {
        setOrderId(state.orderId);
        setOrderFinishedDtos(state.dtos);

        console.log(orderId);
        console.log(orderFinishedDtos);
    }, [])

    return (
        <>
            <div className='container'>
                <div id='orderFinished'>
                    <div className="p-5 mb-4 bg-body-tertiary rounded-3">
                        <div className="container-fluid py-5">
                            <h1 className="display-5 fw-bold">주문 정보 확인</h1>
                            <p className="col-md-8 fs-4">BookMarket</p>
                        </div>
                    </div>

                    <div id='orderFinished_area'>
                        <div className="row align-items-md-stretch">
                            <div className="container">
                                <h2 className="alert alert-danger">주문해 주셔서 감사합니다.</h2>
                                <p>주문은 2~3일 내에 배송될 예정입니다!	!</p>
                                <p>주문번호 : {orderId}</p>
                            </div>
                        </div>

                        <br />
                        <p><Link to="/BookMarket/books" className="btn btn-primary"> &laquo; 도서목록</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderFinished;