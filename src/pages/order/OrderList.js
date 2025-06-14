import React, { useEffect, useState } from 'react';
import { Link, Navigate, json, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

import axios from 'axios';

import Base64 from 'base-64';
import '../../assets/css/order/orderList.css';

import { CaretLeftFill, CaretRightFill, CurrencyEuro } from 'react-bootstrap-icons';

const OrderList = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const location = useLocation();

    const [searchParams, setSearchParams] = useSearchParams();

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
    const [isFirst, setIsFirst] = useState();
    const [isNext, setIsNext] = useState();
    const [isPrev, setIsPrev] = useState();

    const [pageNumbers, setPageNumbers] = useState([]);

    const [orderCnt, setOrderCnt] = useState();

    const [currentPage, setCurrentPage] = useState(1);

    const [prevPage, setPrevPage] = useState();
    const [nextPage, setNextPage] = useState();

    const [prev, setPrev] = useState();
    const [next, setNext] = useState();

    useEffect(() => {

        const params = new URLSearchParams(window.location.search);
        var url;

        if (params.get('page')) {
            var page = params.get('page');
            url = `http://127.0.0.1:8080/api/orders/s?page=${page - 1}`
        } else {
            url = `http://127.0.0.1:8080/api/orders/s`
        }

        const getOrders = async () => {
            axios.get(url,
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
                setPageNumbers(res.data.data.pageNumbers);
                setIsFirst(res.data.data.isFirst);
                setIsNext(res.data.data.isNext);
                setIsPrev(res.data.data.isPrev);

                setCurrentPage(0);
                setPrev(res.data.data.prev);
                setNext(res.data.data.next);

            }).catch(function (res) {
                console.log(res);

                if (res.code === "ERR_NETWORK") {
                    alert("서버와의 연결이 되어있지 않습니다.");
                    navigate("/signin");
                    return false;

                }

                if (res.response.data.message === "배송 주소가 등록 되어있지 않습니다.") {
                    alert(res.response.data.message);
                    navigate("/BookMarket/order/orderCustomerInfo");
                    return;
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

    useEffect(() => {

        // 2025-05-12
        const pagination = document.querySelector("#pagination");

        pagination.addEventListener('click', (e) => {

            // 2025-05-12 : 페이징 처리 중
            var page = 1;

            if (Number(e.target.innerHTML)) {

                page = Number(e.target.innerHTML);
            }

            const getOrders = async () => {
                axios.get(`http://127.0.0.1:8080/api/orders/s?page=${page - 1}`,
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
                    setPageNumbers(res.data.data.pageNumbers);
                    setIsFirst(res.data.data.isFirst);
                    setIsNext(res.data.data.isNext);
                    setIsPrev(res.data.data.isPrev);
                    setPrev(res.data.data.prev);
                    setNext(res.data.data.next);

                }).catch(function (res) {
                    console.log(res);

                    if (res.code === "ERR_NETWORK") {
                        alert("서버와의 연결이 되어있지 않습니다.");
                        navigate("/signin");
                        return false;

                    }

                    if (res.response.data.message === "배송 주소가 등록 되어있지 않습니다.") {
                        alert(res.response.data.message);
                        navigate("/BookMarket/order/orderCustomerInfo");
                        return;
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
        })
    }, [])

    // 2025-05-09 : 페이징 이전, 다음 페이지 처리중

    useEffect(() => {

        const pagination = document.querySelector("#pagination");

        pagination.addEventListener('click', (e) => {

            console.log("현재 페이지 : ", currentPage);

            // 2025-05-13 : 페이징 처리는 되는데 클릭 이벤트가 중복으로 발생하기도 해서 나중에 다시 손봐야한다.
            if (e.target.id === 'prev') {
                console.log("이전 버튼 클릭");

                const params = new URLSearchParams(window.location.search);

                console.log(params.get('page'));

                const prevPage = Number(params.get('page')) - 1;

                setPrevPage(prevPage);

                console.log(prevPage);

                const getOrders = async () => {
                    axios.get(`http://127.0.0.1:8080/api/orders/s?page=${prevPage - 1}`,
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
                        setPageNumbers(res.data.data.pageNumbers);
                        setIsFirst(res.data.data.isFirst);
                        setIsNext(res.data.data.isNext);
                        setIsPrev(res.data.data.isPrev);
                        setPrev(res.data.data.prev);
                        setNext(res.data.data.next);

                    }).catch(function (res) {
                        console.log(res);

                        if (res.code === "ERR_NETWORK") {
                            alert("서버와의 연결이 되어있지 않습니다.");
                            navigate("/signin");
                            return false;

                        }

                        if (res.response.data.message === "배송 주소가 등록 되어있지 않습니다.") {
                            alert(res.response.data.message);
                            navigate("/BookMarket/order/orderCustomerInfo");
                            return;
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

            }

            if (e.target.id === 'next') {
                console.log("다음 버튼 클릭");

                const params = new URLSearchParams(window.location.search);

                console.log(params.get('page'));

                const nextPage = Number(params.get('page')) + 1;

                setNextPage(nextPage);

                const getOrders = async () => {
                    axios.get(`http://127.0.0.1:8080/api/orders/s?page=${nextPage - 1}`,
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
                        setPageNumbers(res.data.data.pageNumbers);
                        setIsFirst(res.data.data.isFirst);
                        setIsNext(res.data.data.isNext);
                        setIsPrev(res.data.data.isPrev);
                        setPrev(res.data.data.prev);
                        setNext(res.data.data.next);

                    }).catch(function (res) {
                        console.log(res);

                        if (res.code === "ERR_NETWORK") {
                            alert("서버와의 연결이 되어있지 않습니다.");
                            navigate("/signin");
                            return false;

                        }

                        if (res.response.data.message === "배송 주소가 등록 되어있지 않습니다.") {
                            alert(res.response.data.message);
                            navigate("/BookMarket/order/orderCustomerInfo");
                            return;
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
            }
        })

    }, [])

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
                                {orderCnt === 0 ?
                                    <div id='isOrders'>
                                        <p>주문 내역이 존재하지 않습니다</p>
                                    </div>
                                    :
                                    <table className="table table-hover text-center">
                                        <thead>
                                            <tr>
                                                <th><Link to={`@{'/order/page?pageNum=' + 1 + '&sortField=orderId&sortDir=' + reverseSortDir}`}>주문 ID</Link></th>
                                                <th><Link to={`@{'/order/page?pageNum=' + 1 + '&sortField=customer_id&sortDir=' + reverseSortDir}`}>고객 ID</Link></th>
                                                <th><Link to={`@{'/order/page?pageNum=' + 1 + '&sortField=shipping_id&sortDir=' + reverseSortDir}`}>베송지</Link></th>
                                                <th>비고</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map((order, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{order.orderId}</td>
                                                        <td>{order.customerId}</td>
                                                        <td>{order.deliveryAddress}</td>
                                                        <td id='orderListBtn' style={{ display: 'flex', justifyContent: 'center', height: '61px' }}>
                                                            <Link to={`/BookMarket/order/view`} state={{ orderId: order.orderId, page: currentPage }}><span className="badge text-bg-secondary">상세보기</span></Link>
                                                            <Link to={`/BookMarket/order/edit`} state={{ orderId: order.orderId, page: currentPage }}><span className="badge text-bg-warning">수정</span></Link>
                                                            <Link to={`/BookMarket/order/delete`} state={{ orderId: order.orderId, page: currentPage }}><span className="badge text-bg-danger">삭제</span></Link>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                }

                                <div id='pagination'>
                                    {orderCnt === 0 ?
                                        ''
                                        :
                                        <div className="my_paging d-flex justify-content-center align-items-center my_mb_lg_1">
                                            {isPrev ?
                                                <div className="my_atag_none my_mr_sm_1">
                                                    <Link id='prev' to={`/BookMarket/order/list?page=${prevPage}`}><CaretLeftFill style={{ pointerEvents: 'none' }}></CaretLeftFill></Link>
                                                </div>
                                                :
                                                ''
                                            }
                                            {/**2025-04-27 : 여기까지 */}
                                            <div style={{ display: 'flex' }} id='pageNumbers' className="my_paging_number_box my_mr_sm_1_1">
                                                {pageNumbers.map((value, index) =>
                                                    <div id='pageNumber' key={index}>
                                                        {/** 페이징 api는 동작, 아래를 function으로 바꿔줘야한다. */}
                                                        <Link to={`/BookMarket/order/list?page=${value}`} onClick={() => setCurrentPage(value)}>{value}</Link>
                                                    </div>
                                                )}
                                            </div>

                                            {isNext ?
                                                <div className="my_atag_none my_ml_sm_1" >
                                                    <Link id='next' to={`/BookMarket/order/list?page=${nextPage}`}><CaretRightFill style={{ pointerEvents: 'none' }}></CaretRightFill></Link>

                                                </div>
                                                :
                                                ''
                                            }
                                        </div>
                                    }
                                </div>
                            </div>

                        </div>


                    </div>
                </div>
            </div >
        </>
    );
};

export default OrderList;