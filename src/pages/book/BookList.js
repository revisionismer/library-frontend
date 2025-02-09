import React, { useEffect, useState } from 'react';
import { Link, Navigate, json, useLocation, useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

import Base64 from 'base-64';

import '../../assets/css/book/bookList.css';

import none from '../../assets/img/none.gif';

const BookList = () => {

    const navigate = useNavigate();

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

    if (ACCESS_TOKEN != null) {
        payload = ACCESS_TOKEN.substring(ACCESS_TOKEN.indexOf('.') + 1, ACCESS_TOKEN.lastIndexOf('.'));
        loginUser = JSON.parse(Base64.decode(payload));
    }

    function deleteCookie(key) {
        document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    const [books, setBooks] = useState([]);

    useEffect(() => {
        const getBooks = async () => {
            axios.get(`http://127.0.0.1:8080/api/books/s/all`,
                {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Authorization': 'Bearer ' + ACCESS_TOKEN
                    }
                }
            ).then(function (res) {

                console.log(res);

                if (res.data.data.totalCount > 0) {
                    setBooks(res.data.data.books);
                }

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

        getBooks();
    }, []);

    return (
        <>
            <div className='container'>
                <div id='bookList'>
                    <div className="p-5 mb-4 bg-body-tertiary rounded-3">
                        <div className="container-fluid py-5">
                            <h1 className="display-5 fw-bold">도서 목록</h1>
                            <p className="col-md-8 fs-4">BookMarket</p>
                        </div>
                    </div>

                    <div id='bookList_area'>
                        <div className="row align-items-md-stretch">
                            {books.map((book, index) => {
                                return (
                                    <div className="col-md-4" key={index}>
                                        <img src={`/bookImg/${book.bookImageUrl}`} alt="image" style={{ width: '45%', height: '45%' }} />
                                        <h3>{book.bookName}</h3>
                                        <p>{book.author}</p>
                                        <p>{book.publisher}</p>
                                        <p style={{ textAlign: 'left' }}>{book.unitPrice}</p>
                                        <p><Link to={`/BookMarket/books/${book.bookId}/detail`} className='btn btn-secondary' role='button'>상세 정보</Link></p>
                                    </div>
                                )
                            })}

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookList;