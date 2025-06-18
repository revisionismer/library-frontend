import React, { useEffect, useState } from 'react';
import { Link, Navigate, json, useLocation, useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

import Base64 from 'base-64';

import '../../assets/css/book/addBook.css';

const AddBook = () => {

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

    useEffect(() => {

        document.querySelector("#book_status").addEventListener('click', (e) => {

            var radioBtns = document.getElementsByName('bookCondition');

            var checkedIdx = 0;

            for (var i = 0; i < radioBtns.length; i++) {

                if (radioBtns[i].checked === true) {
                    checkedIdx = i;
                }

                radioBtns[i].defaultChecked = false;
                radioBtns[i].checked = false;
            }

            radioBtns[checkedIdx].defaultChecked = true;
            radioBtns[checkedIdx].checked = true;
        });

    }, []);

    useEffect(() => {

        let f;

        document.querySelector("#bookImage").addEventListener("change", (e) => {
            f = e.target.files[0];

            // 3-4. 이미지가 아닌 파일은 다시 등록하라고 알러트
            if (!f.type.match("image.*")) {
                alert("이미지를 등록해주세요.");
                e.target.value = "";

                closeModalImage();

                return false;
            }
        })

        document.querySelector("#addBookBtn").addEventListener('click', (e) => {

            const bookName = document.getElementById('bookName').value;
            const unitPrice = document.getElementById('unitPrice').value;
            const author = document.getElementById('author').value;
            const description = document.getElementById('description').value;
            const publisher = document.getElementById('publisher').value;
            const category = document.getElementById('category').value;
            const unitsInStock = document.getElementById('unitsInStock').value;
            const releaseDate = document.getElementById('releaseDate').value;

            var radioBtns = document.getElementsByName('bookCondition');

            var checkedIdx = 0;

            for (var i = 0; i < radioBtns.length; i++) {

                if (radioBtns[i].checked === true) {
                    checkedIdx = i;
                }
            }

            const bookCondition = radioBtns[checkedIdx].value;

            var bookObj = {
                'bookName': bookName,
                'unitPrice': unitPrice,
                'author': author,
                'description': description,
                'publisher': publisher,
                'category': category,
                'unitsInStock': unitsInStock,
                'releaseDate': releaseDate,
                'bookCondition': bookCondition
            }

            let formData = new FormData();
            formData.append('bookObj', JSON.stringify(bookObj));
            formData.append('file', f);

            axios.post(`http://127.0.0.1:8080/api/books/s/register`,
                // 1-1. 첫번째 인자 값 : 서버로 보낼 데이터
                formData,
                // 1-2. 두번째 인자값 : headers 에 세팅할 값들 ex) content-type, media 방식 등
                {
                    headers: {
                        'Authorization': 'Bearer ' + ACCESS_TOKEN,
                        'Content-Type': 'multipart/form-data'

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

    return (
        <>
            <div className='container'>
                <div id='addbook'>
                    <div className="p-5 mb-4 bg-body-tertiary rounded-3">
                        <div className="container-fluid py-5">
                            <h1 className="display-5 fw-bold"><span>도서 등록</span></h1>
                            <p className="col-md-8 fs-4">BookMarket</p>
                        </div>

                    </div>
                    <div id='addbook_area'>
                        <div className="row align-items-md-stretch">
                            <div id='text-end' className="text-end" style={{ padding: '10px', borderBottom: '1px  solid #ddd' }}>

                                <Link to="?lang=ko" style={{ textDecorationLine: 'none' }}>Korean</Link>|
                                <Link to="?lang=en" style={{ textDecorationLine: 'none' }}>English</Link>
                                {ACCESS_TOKEN !== null ?
                                    <input type="button" id='logoutBtn' className="btn btn-sm btn-danger" value="Logout" />
                                    :
                                    <input type="button" className="btn btn-sm btn-success" value="LogIn" />
                                }


                            </div>
                            <legend className='text-end'></legend>
                            <div id='bookWriteForm'>
                                <form className='form-container' action="/BookMarket/books/add" method="post" encType="multipart/form-data">

                                    <div className="mb-3 row">
                                        <label className="col-sm-2 control-label" ><span>bookName</span></label>
                                        <div className="col-sm-3">
                                            <input type="text" id='bookName' name="bookName" className="form-control" />
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="text-danger" />
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label className="col-sm-2 control-label" ><span>unitPrice</span></label>
                                        <div className="col-sm-3">
                                            <input type="text" id='unitPrice' name="unitPrice" className="form-control" />
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="text-danger" />
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label className="col-sm-2 control-label" ><span>author</span></label>
                                        <div className="col-sm-3">
                                            <input type="text" id='author' name="author" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label className="col-sm-2 control-label" ><span>description</span></label>
                                        <div className="col-sm-5">
                                            <textarea type="text" id='description' name="description" cols="50" rows="2" className="form-control"></textarea>
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label className="col-sm-2 control-label" ><span>publisher</span></label>
                                        <div className="col-sm-3">
                                            <input type="text" id='publisher' name="publisher" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label className="col-sm-2 control-label" ><span>category</span></label>
                                        <div className="col-sm-3">
                                            <input type="text" id='category' name="category" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label className="col-sm-2 control-label" ><span>unitsInStock</span></label>
                                        <div className="col-sm-3">
                                            <input type="text" id='unitsInStock' name="unitsInStock" className="form-control" />
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="text-danger" />
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label className="col-sm-2 control-label" ><span>releaseDate</span></label>
                                        <div className="col-sm-3">
                                            <input type="text" id='releaseDate' name="releaseDate" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label className="col-sm-2 control-label"><span>bookCondition</span></label>
                                        <div id='book_status' className="col-sm-3">
                                            <input type="radio" name="bookCondition" value="NEWBOOK" defaultChecked /> New
                                            <input type="radio" name="bookCondition" value="USEDBOOK" /> Old
                                            <input type="radio" name="bookCondition" value="EBOOK" /> E-Book
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label className="col-sm-2 control-label" ><span>bookImage</span></label>
                                        <div className="col-sm-7">
                                            <input type="file" id='bookImage' name="bookImage" className="form-control" />
                                        </div>
                                    </div>

                                    <div id='bookWriteBtnArea'>
                                        <button type="button" id='addBookBtn' name='addBookBtn' className="btn btn-primary">submit</button>
                                        <button type="button" id='cancelBookBtn' name='cancelBookBtn' className="btn btn-danger">cancel</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddBook;