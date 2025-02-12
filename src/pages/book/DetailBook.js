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

    const [book, setBook] = useState([]);

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
    }, [])

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
                        <div className="row align-items-md-stretch">
                            <div className="col-md-4">
                                <div className='text-center'>
                                    <img id='bookImg' src={none} style={{ width: '60%', height: '250px' }} />
                                </div>
                                <div className="text-center">
                                    <button type='button' id='bookImgDownBtn'>이미지다운로드</button>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <h3>{book.bookName}</h3>
                                <p>{book.description}</p>
                                <br />
                                <p><b>도서코드 : </b>
                                    {book.bookCondition === 'NEWBOOK' ?
                                        <span className="badge text-bg-info">신규도서</span>
                                        :
                                        ''
                                    }
                                    {book.bookCondition === 'USEDBOOK' ?
                                        <span className="badge text-bg-warning">중고도서</span>
                                        :
                                        ''
                                    }
                                    {book.bookCondition === 'EBOOK' ?
                                        <span className="badge text-bg-success">전자책</span>
                                        :
                                        ''
                                    }
                                </p>
                                <p><b>저자</b> : <span>{book.author}</span></p>
                                <p><b>출판사</b> : <span>{book.publisher}</span></p>
                                <p><b>출판일</b> : <span>{book.releaseDate}</span></p>
                                <p><b>분류</b> : <span>{book.category}</span></p>
                                <p><b>재고</b> : <span>{book.unitsInStock}</span></p>
                                <p><b>가격</b> : <span>{book.unitPrice}</span></p>
                                <br />

                                <div id='bookBtn_area'>
                                    <button id='bookAddBtn' className='btn btn-primary'>도서 주문 &raquo;</button>
                                    <Link to={`/BookMarket/books`} className='btn btn-secondary'>도서 목록 &raquo;</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailBook;