import React, { useEffect, useState } from 'react';
import { Link, Navigate, json, useLocation, useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

import Base64 from 'base-64';

import none from '../../assets/img/none.gif';

import '../../assets/css/order/orderConfirmation.css';

const OrderConfirmation = () => {
    const navigate = useNavigate();

    const { state } = useLocation();

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

    const [cartItems, setCartItems] = useState([]);

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        // 2025-03-22

        // 1-1. 장바구니에서 주문한 정보를 불러오기전에 계정에 배송 정보가 등록되어 있는지 확인한다. 없으면 배송 주소 등록 페이지로 redirect

        // 1-2. 청구 주소도 해당 계정 정보가 DB에 등록되어 있는지 확인하고 없으면 청구 주소 등록 페이지로 이동한다.

        // 1-3. 장바구니에서 저장한 상품 정보들을 불러온다.

        // 1-4. 주소를 확인하고 청구주소를 확인 한뒤 실제로 주문을 진행한다.

        // 2025-03-23 : 장바구니에 담은 아이템들 주문 정보 확인 페이지에 뿌려주기 성공
        if (state != null) {
            setCartItems(state);
        }

        var totalPrice = 0;

        for (var i = 0; i < state.length; i++) {
            totalPrice += state[i].price * state[i].count;
        }

        setTotalPrice(totalPrice);

    }, [])

    const [address, setAddress] = useState({
        country: "",
        zipcode: "",
        addressName: "",
        detailName: "",
        userId: null,
        name: ""

    });

    useEffect(() => {
        const getAddress = async () => {
            axios.get(`http://127.0.0.1:8080/api/addresses/s/info`,
                {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Authorization': 'Bearer ' + ACCESS_TOKEN
                    }
                }
            ).then(function (res) {
                console.log(res);
                setAddress(res.data.data)

            }).catch(function (res) {
                console.log(res);

                // 2025-03-25 : 여기까지 함, 다음에는 주소 등록하는 페이지로 이동 후 주소 등록하기
                if (res.response.data.message === '등록된 주소가 없습니다.') {
                    alert("등록된 주소가 없습니다. 주소를 등록해주세요.");
                    navigate("/BookMarket/order/orderCustomerInfo");
                    return false;
                }


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

        // 2025-03-27 : 여기까지
        getAddress();
    }, [])

    useEffect(() => {


    }, [])

    return (
        <>
            <div className='container'>
                <div id='orderInfo'>
                    <div className="p-5 mb-4 bg-body-tertiary rounded-3">
                        <div className="container-fluid py-5">
                            <h1 className="display-5 fw-bold">주문 정보 확인</h1>
                            <p className="col-md-8 fs-4">BookMarket</p>
                        </div>
                    </div>

                    <div id='orderInfo_area'>
                        <div className="row align-items-md-stretch">
                            <form action="/BookMarket/order/orderConfirmation" className="form-horizontal" method="post" >
                                <div className="container col-md-10 py-5" style={{ background: '#fafafe' }}>
                                    <div className="text-center">
                                        <h1>영수증</h1>
                                    </div>
                                    <div id='receipt' className="row text-left">
                                        <div>
                                            <strong>배송 주소</strong><br />
                                            성명 : {address.name}<br />
                                            우편번호 : {address.zipcode}<br />
                                            주소 : {address.addressName}, {address.detailName} ({address.country})<br />
                                        </div>
                                        <div>
                                            <p>
                                                <em>배송일: 오늘</em>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="row py-2">
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th className="text-center">도서</th>
                                                    <th className="text-center">수량</th>
                                                    <th className="text-center">가격</th>
                                                    <th className="text-center">합계</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cartItems.map((cartItem, index) => {
                                                    return (
                                                        <tr className="col-md-4" key={index}>

                                                            <td className="text-center"><em>{cartItem.itemNm}</em></td>

                                                            <td className="text-center">{cartItem.count}</td>
                                                            <td className="text-center">
                                                                <span>{cartItem.price}원</span>
                                                            </td>
                                                            <td className="text-center">{cartItem.price * cartItem.count}</td>
                                                        </tr>
                                                    )
                                                })}

                                                <tr>
                                                    <td> </td>
                                                    <td> </td>
                                                    <td className='text-right'>총액: </td>

                                                    <td className="text-center text-danger">
                                                        <h4><strong>{totalPrice}원</strong></h4>

                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="container col-md-5 py-3 text-center">
                                        <Link id='confirmPrev' to="/BookMarket/order/list" className="btn btn-primary" role="button">주문 목록</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderConfirmation;