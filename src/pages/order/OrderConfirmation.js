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
            setCartItems(state.cartItems);
        }

        var totalPrice = 0;

        for (var i = 0; i < state.cartItems.length; i++) {
            totalPrice += state.cartItems[i].price * state.cartItems[i].count;
        }

        setTotalPrice(totalPrice);

        console.log(state);

    }, []);

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
        IMP.init('imp76666016');

        document.querySelector('#orderBtn').addEventListener('click', (e) => {
            var radioBtns = document.getElementsByName('payCondition');

            var checkedIdx = 0;

            for (var i = 0; i < radioBtns.length; i++) {

                if (radioBtns[i].checked === true) {
                    checkedIdx = i;
                }
            }

            const payCondition = radioBtns[checkedIdx].value;

            var obj = state.cartItems;

            console.log(obj);

            axios.post(`http://127.0.0.1:8080/api/orders/s/order`,
                JSON.stringify(obj),
                {
                    headers: {
                        'Authorization': 'Bearer ' + ACCESS_TOKEN,
                        'Content-Type': 'application/json; charset=UTF-8'

                    }
                }
            ).then(function (res) {
                console.log(res);
                // 2025-04-14 : 주문API 까지 해놨으니 주문 완료 후 처리를 해줘야한다.
                navigate('/BookMarket/order/orderFinished', { state: res.data.data });

            }).catch(function (res) {
                console.log(res);

                if (res.code === "ERR_NETWORK") {
                    console.log("서버와의 연결이 되어 있지 않습니다.");
                    return false;

                }

                if (res.response.data.message === '배송 주소가 등록 되어있지 않습니다.') {
                    alert(res.response.data.message);
                    navigate("/BookMarket/order/orderCustomerInfo");

                    return false;
                }

                if (res.response.data.message === '주문 수량이 재고 수량보다 더 많습니다.' || res.response.data.message === '재고가 없습니다.') {
                    alert(res.response.data.message);
                    return false;
                }

                if (res.response.status === 500 || res.response.status === 400 || res.response.status === 401 || res.response.status === 403) {
                    // 2024-03-28 : alert가 두번씩 호출됨 고민해봐야함 : index.js에서 문제됨
                    alert(res.response.data.message);

                    // 2024-04-12 : 무슨 이유인지 GET 방식에서는 403일때 서버에서 쿠키 삭제가 안되어 클라이언트 단에서 직접 삭제
                    deleteCookie('access_token');
                    navigate("/signin");
                    return;
                }
            })


            /*
                        IMP.request_pay(
                            {
                                pg: `html5_inicis.INIpayTest`,
                                pay_method: payCondition, // card(신용카드), trans(실시간계좌이체), vbank(가상계좌), phone(소액결제)
                                merchant_uid: Number.parseInt(`${userId}`),  // 구매자 아이디
                                amount: Number.parseInt(`${totalPrice}`), // 결제금액
                                name: `주문명`, // 주문명
                                //    buyer_name: `구매자 이름`
                                //    buyer_tel: `구매자 전화번호`, 
                                //    buyer_email: `구매자 이메일(한글이 포함되면 안됨)`, 
                                //    buyer_addr: `구매자 주소`, 
                                //    buyer_postcode: `구매자 우편번호` 
                            },
                            function (response) {
                                // 결제 종료 시 호출되는 콜백 함수
                                // response.imp_uid 값으로 결제 단건조회 API를 호출하여 결제 결과를 확인하고,
                                // 결제 결과를 처리하는 로직을 작성합니다.
            
                                console.log(response);
            
                                if (response.success) {
                                    // 결제가 성공할 시 실제로 내부에서 주문 정보를 저장해야되는 로직이 필요.
            
                                } else {
                                    alert(response.error_msg);
                                    return false;
                                }
            
                            }
                        );
            */
        })
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

                                    <div id='orderCustomerInfo' className="row text-left">
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
                                                        <h4 id='totalOrderPrice'><strong>{totalPrice}원</strong></h4>

                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div id='pay_method' className="col-sm-3">
                                        <label>결제 방법 : </label>
                                        <div id='payConditionArea'>
                                            <input type="radio" name="payCondition" value="card" defaultChecked /> 카드
                                            <input type="radio" name="payCondition" value="trans" /> 실시간계좌이체
                                        </div>
                                    </div>

                                    <div className="container col-md-5 py-3 text-center">
                                        <button id='orderBtn' type='button' className="btn btn-primary">주문 하기</button>
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