import React, { useEffect, useState } from 'react';
import { Link, Navigate, json, useLocation, useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

import Base64 from 'base-64';

import none from '../../assets/img/none.gif';

import '../../assets/css/book/detailBook.css';

const DetailBook = () => {

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

    const [book, setBook] = useState({
        bookId: null,
        bookName: '',
        author: '',
        description: '',
        category: '',
        publisher: '',
        bookCondition: '',
        bookImageUrl: '',
        fileName: '',
        releaseDate: '',
        unitPrice: null,
        unitsInStock: null,
        userId: null
    });

    var bookId = id;

    useEffect(() => {

        const bookImg = document.querySelector('#bookImg');

        const getBook = async () => {
            axios.get(`http://127.0.0.1:8080/api/books/s/${bookId}/info`,
                {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Authorization': 'Bearer ' + ACCESS_TOKEN
                    }
                }
            ).then(function (res) {

                console.log(res);

                setBook(res.data.data);

                bookImg.src = "/bookImg/" + res.data.data.bookImageUrl;
                bookImg.value = res.data.data.bookImageUrl;

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

        getBook();
    }, []);

    useEffect(() => {

        document.querySelector("#cartBookBtn").addEventListener('click', () => {
            var totalPrice = document.querySelector("#totalPrice");
            var price = document.querySelector("#price");
            var count = document.querySelector("#count");

            if (Number.parseInt(totalPrice.innerHTML) === 0) {
                alert("1개 이상 장바구니에 담아야합니다.");
                count.focus();
                return;
            }

            const cartItemObj = {
                bookId: bookId,
                count: count.value
            }

            axios.post(`http://127.0.0.1:8080/api/carts/s/cartItem/add`,
                // 1-1. 첫번째 인자 값 : 서버로 보낼 데이터
                JSON.stringify(cartItemObj),
                // 1-2. 두번째 인자값 : headers 에 세팅할 값들 ex) content-type, media 방식 등
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

        });

    }, [])

    useEffect(() => {
        calculateTotalPrice();

        document.querySelector("#count").addEventListener('change', () => {
            calculateTotalPrice();
        })

    }, []);

    function calculateTotalPrice() {

        var count = document.querySelector("#count").value;
        var price = document.querySelector("#price").value;

        var totalPrice = price * count;

        document.querySelector("#totalPrice").innerHTML = totalPrice + '원';

    }

    function limitDigits(event, unitsInStock) {

        const count = document.querySelector("#count");

        var special_pattern = /[`~.!@#$%^&*|\\\'\";:\/?]/gi;

        if (special_pattern.test(event.target.value)) {
            alert("정수 값만 입력해주세요.");
            count.value = 0;
            return false;

        }

        if (event.target.value > unitsInStock) {
            alert(`주문할 수 있는 제품 수량은 ${unitsInStock}개까지 입니다.(현재 재고 : ${unitsInStock})`);
            count.value = 0;
            return false;
        }
    }

    return (
        <>
            <div className='container'>
                <div id='bookInfo'>
                    <div className="p-5 mb-4 bg-body-tertiary rounded-3">
                        <div className="container-fluid py-5">
                            <h1 className="display-5 fw-bold">도서 상세 정보</h1>
                            <p className="col-md-8 fs-4">BookMarket</p>
                        </div>
                    </div>

                    <div id='bookInfo_area'>
                        <input type="hidden" id="itemId" defaultValue="" />

                        <div id='detailBookArea'>

                            <div className="repImgDiv">
                                <img id='bookImg' className="rounded repImg" src={none} width="300" height="300" />
                            </div>
                            <div className="wd40">
                                <div id='bookCondition' className='mb30'>
                                    {book.bookCondition === 'NEWBOOK' ?
                                        <span id='bookCondition' className="badge text-bg-info">신규도서</span>
                                        :
                                        ''
                                    }
                                    {book.bookCondition === 'USEDBOOK' ?
                                        <span id='bookCondition' className="badge text-bg-warning">중고도서</span>
                                        :
                                        ''
                                    }
                                    {book.bookCondition === 'EBOOK' ?
                                        <span id='bookCondition' className="badge text-bg-success">전자책</span>
                                        :
                                        ''
                                    }
                                </div>
                                <div id='bookName' className="h4">{book.bookName}</div>
                                <hr className="my-4" />

                                <div className="text-right">

                                    <div id='itemCntArea' className="input-group">
                                        <div id='itemCntText' className="input-group-prepend">
                                            <span className="input-group-text">수량</span>
                                        </div>
                                        <div id='countArea'>
                                            {book.unitsInStock === 0 ?
                                                <div className="text-right">
                                                    <input type="number" id="count" name="count" className="form-control" defaultValue="0" onChange={() => limitDigits()} readOnly />
                                                </div>
                                                :
                                                <div className="text-right">
                                                    <input type="number" id="count" name="count" className="form-control" defaultValue="0" max="999" onChange={(event) => limitDigits(event, book.unitsInStock)} style={{ width: '35px' }} />
                                                </div>
                                            }
                                        </div>
                                        <p style={{ margin: '5px 2px' }}>(재고 : {book.unitsInStock})</p>
                                    </div>

                                    <div className="h4 text-danger text-left">
                                        <input type="hidden" id="price" name="price" defaultValue={book.unitPrice} />
                                        <span>{book.unitPrice}</span>원
                                    </div>
                                </div>
                                <hr className="my-10" />

                                <div className="text-right mgt-50">
                                    {book.unitsInStock === 0 ?
                                        <div className="text-right">
                                            <h5>입고 예정입니다.</h5>
                                        </div>
                                        :
                                        <div className="text-right">
                                            <h5 className='mr-5'>결제 금액</h5>
                                            <h3 id="totalPrice" className="font-weight-bold">0</h3>
                                        </div>
                                    }
                                </div>
                                {book.unitsInStock === 0 ?
                                    <div id='bookDetailBtn' className="text-right mgt-50">
                                        <button type="button" className="btn btn-danger btn-lg">품절</button>
                                    </div>
                                    :
                                    <div id='bookDetailBtn' className="text-right mgt-50">
                                        <button type="button" id='cartBookBtn' className="btn btn-secondary btn-lg" style={{ marginRight: '5px ' }}>장바구니</button>
                                        <button type="button" id='orderBootBtn' className="btn btn-primary btn-lg">주문하기</button>
                                    </div>
                                }

                            </div>

                        </div>

                        <div className="detail jumbotron jumbotron-fluid mgt-30">
                            <div className="container">
                                <h4>상품 상세 설명</h4>
                                <hr className="my-4" />
                                <p className="lead">소개글</p>
                            </div>
                        </div>

                        <div className="text-center">
                            {book.description}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailBook;