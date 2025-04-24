import React, { useEffect, useState } from 'react';
import { Link, Navigate, json, useLocation, useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

import Base64 from 'base-64';
import '../../assets/css/order/orderList.css';

const OrderList = () => {

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

    const [orders, setOrders] = useState([]);

    const [orderCnt, setOrderCnt] = useState();

    useEffect(() => {

        const getOrders = async () => {
            axios.get(`http://127.0.0.1:8080/api/orders/s`,
                {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Authorization': 'Bearer ' + ACCESS_TOKEN
                    }
                }
            ).then(function (res) {

                console.log(res);

                // 2025-04-22 : 여기까지 완료
                setOrders(res.data.data.orderList);
                setOrderCnt(res.data.data.orderCnt);

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

        getOrders();

    }, []);

    return (
        <>
            <div className='container'>
                <div id='orderList'>
                    <div className="p-5 mb-4 bg-body-tertiary rounded-3">
                        <div className="container-fluid py-5">
                            <h1 className="display-5 fw-bold">주문목록</h1>
                            <p className="col-md-8 fs-4">BookMarket</p>
                        </div>
                    </div>
                    <div id='orderList_area'>
                        <div className="row align-items-md-stretch">
                            <div id='orderList_area_btn'>
                                <div className="col-md-12">
                                    <div>
                                        <input type="hidden" name="_method" value="delete" />
                                        <Link className="btn btn-danger" style={{ float: 'left' }}>삭제하기</Link>
                                    </div>
                                    <div>
                                        <input type="button" className="btn btn-success text-right" style={{ float: 'right' }} value="Logout" />
                                    </div>
                                </div>
                            </div>

                            <div style={{ paddingTop: "50px" }}>
                                <div className="text-end" style={{ paddingRight: '30px' }}>전체 주문수: {orderCnt}</div>

                                <table className="table table-hover text-center">
                                    <thead>
                                        <tr>
                                            <th><Link to={`@{'/order/page?pageNum=' + 1 + '&sortField=orderId&sortDir=' + reverseSortDir}`}>주문 ID</Link></th>
                                            <th><Link to={`@{'/order/page?pageNum=' + 1 + '&sortField=orderId&sortDir=' + reverseSortDir}`}>주문아이템 ID</Link></th>
                                            <th><Link to={`@{'/order/page?pageNum=' + 1 + '&sortField=customer_id&sortDir=' + reverseSortDir}`}>고객 ID</Link></th>
                                            <th><Link to={`@{'/order/page?pageNum=' + 1 + '&sortField=shipping_id&sortDir=' + reverseSortDir}`}>베송지</Link></th>
                                            <th><Link to={`@{'/order/page?pageNum=' + 1 + '&sortField=grandTotal&sortDir=' + reverseSortDir}`}>총액</Link></th>
                                            <th>비고</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders == 0 ?
                                            <tr id='isBookText'>
                                                <td>등록된 책이 없습니다.</td>
                                            </tr>

                                            :

                                            orders.map((order, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{order.orderId}</td>
                                                        <td>{order.orderItemId}</td>
                                                        <td>{order.customerId}</td>
                                                        <td>{order.deliveryAddress}</td>
                                                        <td>{order.totalOrderPrice}원</td>
                                                        <td id='orderListBtn' style={{ display: 'flex', justifyContent: 'center' }}>
                                                            <Link to={`/order/view/${order.orderId}`}><span className="badge text-bg-secondary">상세보기</span></Link>
                                                            <Link to={`/order/edit/${order.orderId}`}><span className="badge text-bg-warning">수정</span></Link>
                                                            <Link to={`/order/delete/${order.orderId}`}><span className="badge text-bg-danger">삭제</span></Link>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }




                                    </tbody>
                                </table>
                            </div>


                        </div>


                    </div>
                </div>
            </div >
        </>
    );
};

export default OrderList;