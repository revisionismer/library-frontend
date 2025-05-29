import React, { useEffect, useState } from 'react';
import { Link, Navigate, json, useLocation, useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

import Base64 from 'base-64';

import '../../assets/css/order/orderView.css';

const OrderView = () => {

    const navigate = useNavigate();

    const { state } = useLocation();

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

    const [orderItems, setOrderItems] = useState([]);
    const [orderCnt, setOrderCnt] = useState();

    useEffect(() => {

        var orderId = state.orderId;

        var page = state.page;

        console.log(orderId + ", " + page);

        const getOrder = async () => {
            axios.get(`http://127.0.0.1:8080/api/orders/s/${orderId}/info`,
                {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Authorization': 'Bearer ' + ACCESS_TOKEN
                    }
                }
            ).then(function (res) {
                
                console.log(res);

                setOrderItems(res.data.data.orderItems);
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

        getOrder();
    }, [])

    return (
        <>
            <div className='container'>
                <div id='orderView'>
                    <div className="p-5 mb-4 bg-body-tertiary rounded-3">
                        <div className="container-fluid py-5">
                            <h1 className="display-5 fw-bold">주문 정보 보기</h1>
                            <p className="col-md-8 fs-4">BookMarket</p>
                        </div>
                    </div>

                    <div id='orderView_area'>
                        <div className="row align-items-md-stretch">
                            <div className="container">

                                <p>주문번호 : {state.orderId}</p>

                                {orderCnt === 0 ? 
                                <div className="row text-left">
                                    <div className="col-md-6 py-3">
                                        <p>주문 내역이 존재하지 않습니다.</p>
                                    </div>
                                </div>  
                                : 
                                
                                <div className="row text-left">
                                    {orderItems.map((order, index) => 
                                    <div className="row py-2" key={index}>
                                        <input type='hidden' id='orderId' name='orderId' value={order.orderId}/>
                                        <input type='hidden' id='orderItemId' name='orderItemId' value={order.orderItemId}/>
                                        <input type='hidden' id='unitsInStock' name='unitsInStock' value={order.unitsInStock}/>

                                        <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th className="text-center">도서</th>
                                                <th className="text-center">수량</th>
                                                <th className="text-center">가격</th>
                                                <th className="text-center">소계</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                                   
                                        <tr>                                 	     
                                            <td className="text-center">  
                                                <em>{order.itemNm}</em>
                                            </td>
                                        
                                            <td className="text-center" style={{textAlign:'center'}}>{order.count}</td>              	
                                            <td className="text-center">
                                               <span>{order.price}</span> 
                                            </td>              
                                         
                                            <td className="text-center">{order.totalOrderPrice}원</td>
                                        </tr>
                                              
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td className="text-right"><h5> <strong>총액:</strong></h5></td>
                                            <td className="text-center text-danger"><h4><strong>{order.totalOrderPrice}원</strong></h4></td>
                                        </tr>  
                                      </tbody>           
                                     </table>
                                   </div>   
                          
                                    )}
                                </div>  
                                }
                               
                                
                            </div>
                        </div>

                        <br />
                        <p>
                            <Link to="/BookMarket/books" className="btn btn-primary"> &laquo; 도서목록</Link>
                            <Link to={`/BookMarket/order/list?page=${state.page == 0 ? 1 : state.page}`} className="btn btn-warning"> &laquo; 뒤로가기</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderView;