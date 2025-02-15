import React, { useEffect, useState } from 'react';
import { Link, Navigate, json, useLocation, useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

import Base64 from 'base-64';

import none from '../../assets/img/none.gif';

const OrderConfirmation = () => {
    const navigate = useNavigate();

    const { id } = useParams();

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

    useEffect(() => {

        const bookId = id;

        const getOrderBook = async () => {
            axios.get(`http://127.0.0.1:8080/api/orders/s/${bookId}/info`,
                {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Authorization': 'Bearer ' + ACCESS_TOKEN
                    }
                }
            ).then(function (res) {

                console.log(res);


            }).catch(function (res) {
                console.log(res);

                if (res.code === "ERR_NETWORK") {
                    alert("서버와의 연결이 되어있지 않습니다.");
                    navigate("/signin");
                    return false;

                }

                if (res.response.status === 400 || res.response.status === 401 || res.response.status === 403) {
                    // 2024-03-28 : alert가 두번씩 호출됨 고민해봐야함 : index.js에서 문제됨
                    alert(res.response.data.message);

                    // 2024-04-12 : 무슨 이유인지 GET 방식에서는 403일때 서버에서 쿠키 삭제가 안되어 클라이언트 단에서 직접 삭제
                    deleteCookie('access_token');
                    navigate("/signin");
                    return;
                }
            })
        }

        getOrderBook();

    }, [])

    return (
        <>
            <div className='container'>
                <div id='orderInfo'>
                    <div className="p-5 mb-4 bg-body-tertiary rounded-3">
                        <div className="container-fluid py-5">
                            <h1 className="display-5 fw-bold">주문 하기</h1>
                            <p className="col-md-8 fs-4">BookMarket</p>
                        </div>
                    </div>

                    <div id='orderInfo_area'>
                        <input type="hidden" id="itemId" defaultValue="" />

                        <div className="d-flex">
                            <div className="repImgDiv">
                                <img className="rounded repImg" src={none} width="300" height="300" />
                            </div>
                            <div className="wd50">
                                <span>판매중</span>
                                <span >품절</span>

                                <div className="h4">아이템 제목</div>
                                <hr className="my-4" />

                                <div className="text-right">
                                    <div className="h4 text-danger text-left">
                                        <input type="hidden" id="price" name="price" defaultValue="1" />
                                        <span>100</span>원
                                    </div>
                                    <div className="input-group w-50" style={{ display: 'flex', justifyContent: 'flex-start', width: '50%' }}>
                                        <div className="input-group-prepend" style={{ width: '40px', marginRight: '10px', paddingTop: '7px' }}>
                                            <span className="input-group-text">수량</span>
                                        </div>
                                        <div className="text-right">
                                            <input type="number" id="count" name="count" className="form-control" defaultValue="1" min="1" />
                                        </div>
                                        <div className="text-right">
                                            <input type="number" id="count" name="count" className="form-control" defaultValue="0" readOnly />
                                        </div>
                                    </div>
                                </div>
                                <hr className="my-10" />

                                <div className="text-right mgt-50">
                                    <div className="text-right">
                                        <h5>결제 금액</h5>
                                        <h3 id="totalPrice" className="font-weight-bold">0</h3>
                                    </div>
                                    <div className="text-right">
                                        <h5>입고 예정입니다.</h5>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <button type="button" className="btn btn-secondary btn-lg">장바구니 담기</button>
                                    <button type="button" className="btn btn-primary btn-lg">주문하기</button>
                                </div>
                                <div className="text-right">
                                    <button type="button" className="btn btn-danger btn-lg">품절</button>
                                </div>
                            </div>

                        </div>

                        <div className="detail jumbotron jumbotron-fluid mgt-30">
                            <div className="container">
                                <h4>상품 상세 설명</h4>
                                <hr className="my-4" />
                                <p className="lead">아이템 상세 설명</p>
                            </div>
                        </div>

                        <div className="text-center">
                            <img className="rounded mgb-15" src={none} width="700" />
                        </div>
                    </div>
                </div >
            </div >
        </>
    );
};

export default OrderConfirmation;