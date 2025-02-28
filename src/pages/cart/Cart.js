import React, { useEffect, useState } from 'react';
import { Link, Navigate, json, useLocation, useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

import Base64 from 'base-64';

import none from '../../assets/img/none.gif';

import '../../assets/css/cart/cart.css';

import qs from 'qs';

const Cart = () => {

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

    const [carts, setCarts] = useState([]);

    useEffect(() => {
        const getCarts = async () => {
            axios.get(`http://127.0.0.1:8080/api/carts/s/cartItem/all`,
                {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Authorization': 'Bearer ' + ACCESS_TOKEN
                    }
                }
            ).then(function (res) {

                console.log(res);
                setCarts(res.data.data);

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

        getCarts();
    }, [])

    useEffect(() => {
        document.querySelector('#cartOrderBtn').addEventListener('click', (e) => {
            var checkboxes = document.querySelectorAll('input[name="selectBook"]:checked');

            var obj = new Object();

            checkboxes.forEach((checkbox, index) => {
                var tr = checkbox.parentNode.parentNode;
                var td = tr.childNodes;
                // obj.push(checkbox.id.slice(11));

                obj[index] = {
                    cartId: checkbox.id.slice(11),
                    cartItemId: td[1].textContent,
                    itemNm: td[2].textContent,
                    price: td[3].textContent,
                    count: td[4].childNodes[0].value
                }

            })

            console.log(obj);

            axios.post(`http://127.0.0.1:8080/api/orders/s/cartItem`,
                JSON.stringify(obj),
                {
                    headers: {
                        'Authorization': 'Bearer ' + ACCESS_TOKEN,
                        'Content-Type': 'application/json; charset=UTF-8'

                    }
                }
            ).then(function (res) {
                console.log(res);


            }).catch(function (res) {
                console.log(res);

                if (res.code === "ERR_NETWORK") {
                    console.log("서버와의 연결이 되어 있지 않습니다.");
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

        })
    }, [])

    return (
        <>
            <div className='container'>
                <div className="p-5 mb-4 bg-body-tertiary rounded-3">
                    <div className="container-fluid py-5">
                        <h1 className="display-5 fw-bold">장바구니</h1>
                        <p className="col-md-8 fs-4">BookMarket</p>
                    </div>
                </div>
                <div id='cart'>
                    <div id='cart_area'>
                        {carts !== null ?
                            <div id='cart_area_btn'>
                                <div className="row align-items-md-stretch">
                                    <div className="col-md-12">
                                        <input type="hidden" name="_method" value="delete" />
                                        <button id='cartCancelBtn' className="btn btn-danger" style={{ float: 'left' }}>삭제하기</button>
                                        <button id='cartOrderBtn' className="btn btn-success text-right" style={{ float: 'right' }}>주문하기</button>
                                    </div>
                                </div>
                            </div>
                            :
                            ''
                        }
                        {carts === null ?
                            <div id='cartEmpty_area'>
                                <p>장바구니가 비어있습니다.</p>
                            </div>
                            :

                            <div style={{ paddingTop: '50px' }}>
                                <form id="cartForm" name="cartForm" method="post">
                                    <input type="hidden" name="_method" value="delete" />
                                    <table className="table table-hover text-center">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>cartItemId</th>
                                                <th>도서</th>
                                                <th>가격</th>
                                                <th>수량</th>
                                                <th>비고</th>
                                                <th>-</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {carts.map((cart, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>
                                                            <input type='checkbox' id={`selectBook_${cart.cartId}`} name='selectBook' />
                                                        </td>
                                                        <td>{cart.cartItemId}</td>
                                                        <td>{cart.itemNm}</td>
                                                        <td>{cart.price}</td>
                                                        <td><input type='number' id='count' name='count' defaultValue={cart.count} style={{ textAlign: 'center', width: '40px' }} /></td>
                                                        <td>신청 중</td>
                                                        <td>
                                                            {cart.unitsInStock === 0 ?
                                                                <Link>
                                                                    <span className="badge text-bg-danger">재고 부족</span>
                                                                </Link>
                                                                :
                                                                <Link>
                                                                    <span className="badge text-bg-primary">주문 가능</span>
                                                                </Link>
                                                            }
                                                        </td>
                                                    </tr>

                                                )
                                            })}

                                        </tbody>
                                    </table>
                                </form>
                                <div className="text-end" style={{ paddingRight: '30px' }}>
                                    <b> 총액 :
                                        <span>
                                            10000원
                                        </span>
                                    </b>
                                </div>
                                <br />
                                <Link to="/BookMarket/books" className="btn btn-secondary "> &laquo; 쇼핑 계속하기</Link>

                            </div>
                        }

                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;