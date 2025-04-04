import React, { useEffect, useState } from 'react';
import { Link, Navigate, json, useLocation, useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

import Base64 from 'base-64';

import '../../assets/css/order/orderCustomerInfo.css';

// 주문하는 고객 ID정보 가져오고(로그인한 회원)
// 성명(로그인한 회원)
// 전화번호
// 국가명
// 주소
// 세부주소

const OrderCustomerInfo = () => {

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
    let userId;

    if (ACCESS_TOKEN != null) {
        payload = ACCESS_TOKEN.substring(ACCESS_TOKEN.indexOf('.') + 1, ACCESS_TOKEN.lastIndexOf('.'));
        loginUser = JSON.parse(Base64.decode(payload));
        userId = loginUser.id;
    }

    function deleteCookie(key) {
        document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    const [user, setUser] = useState({
        id: null,
        username: "",
        name: "",
        bio: "",
        gender: "",
        website: "",
        phone: "",
        profileImageUrl: ""
    });

    useEffect(() => {

        const getUser = async () => {
            axios.get(`http://127.0.0.1:8080/api/users/s/${userId}/info`,
                {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Authorization': 'Bearer ' + ACCESS_TOKEN
                    }
                }
            ).then(function (res) {

                console.log(res);

                setUser(res.data.data);


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

        getUser();
    }, [])

    useEffect(() => {
        document.querySelector("#addressRegiBtn").addEventListener('click', () => {
            var country = document.querySelector("#country");
            var zipcode = document.querySelector("#zipcode");
            var addressName = document.querySelector("#addressName");
            var detailName = document.querySelector("#detailName");

            if (country.value === '') {
                alert("국가명을 입력해주세요.");
                country.focus();
                return false;
            } else if (zipcode.value === '') {
                alert("우편번호를 입력해주세요.");
                zipcode.focus();
                return false;
            } else if (addressName.value === '') {
                alert("주소를 입력해주세요.");
                addressName.focus();
                return false;
            } else if (detailName.value === '') {
                alert("세부 주소를 입력해주세요.");
                detailName.focus();
                return false;
            } else {
                const addressObj = {
                    country: country.value,
                    zipcode: zipcode.value,
                    addressName: addressName.value,
                    detailName: detailName.value
                }

                console.log(addressObj);

                axios.post(`http://127.0.0.1:8080/api/addresses/s/add`,
                    // 1-1. 첫번째 인자 값 : 서버로 보낼 데이터
                    JSON.stringify(addressObj),
                    // 1-2. 두번째 인자값 : headers 에 세팅할 값들 ex) content-type, media 방식 등
                    {
                        headers: {
                            'Content-Type': 'application/json; charset=UTF-8',
                            'Authorization': 'Bearer ' + ACCESS_TOKEN
                        }
                    }
                ).then(function (res) {
                    console.log(res);

                    alert("장바구니로 돌아갑니다.");
                    navigate("/BookMarket/cart");

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
            }

        });
    }, [])

    // 2025-03-27 : 추후에 다음 주소 찾기 API 붙여서 처리해보기.
    return (
        <>
            <div className='container'>
                <div className="p-5 mb-4 bg-body-tertiary rounded-3">
                    <div className="container-fluid py-5">
                        <h1 className="display-5 fw-bold">주문 고객 정보</h1>
                        <p className="col-md-8 fs-4">BookMarket</p>
                    </div>
                </div>
                <div id='orderCustomerInfo'>
                    <div id='orderCustomerInfo_area'>
                        <div className="row align-items-md-stretch">

                            <form id='orderCustomerForm' method="post">
                                <input type="hidden" id='userId' name="userId" className="form-control" defaultValue={user.id}></input>
                                <label>고객 세부 사항</label>
                                <div className="mb-3 row">
                                    <label className="col-sm-2 control-label">고객 ID </label>
                                    <div className="col-sm-3">
                                        <input type="text" id='username' name="username" className="form-control" defaultValue={user.username} />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label className="col-sm-2 control-label">성명</label>
                                    <div className="col-sm-3">
                                        <input type="text" id='name' name="name" className="form-control" defaultValue={user.name} />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label className="col-sm-2 control-label">전화번호</label>
                                    <div className="col-sm-3">
                                        <input type="text" id='phone' name="phone" className="form-control" defaultValue={user.phone} />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label className="col-sm-2 control-label">국가명</label>
                                    <div className="col-sm-3">
                                        <input type="text" id='country' name="country" className="form-control" placeholder='국가명을 입력해주세요.' />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label className="col-sm-2 control-label">우편번호</label>
                                    <div className="col-sm-3">
                                        <input type="text" id='zipcode' name="zipcode" className="form-control" placeholder='우편번호를 입력해주세요.' />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label className="col-sm-2 control-label">주소</label>
                                    <div className="col-sm-5">
                                        <input type="text" id='addressName' name="addressName" height="50" width="2" className="form-control" placeholder='주소를 입력해주세요.' />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label className="col-sm-2 control-label">세부주소</label>
                                    <div className="col-sm-3">
                                        <input type="text" id='detailName' name="detailName" className="form-control" placeholder='세부주소를 입력해주세요.' />
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <div className="col-sm-offset-2 col-sm-10">
                                        <button id='addressRegiBtn' type="button" className="btn btn-primary" role="button" style={{ marginRight: '2px' }}>등록</button>
                                        <button id='addressCancelBtn' type='button' className="btn btn-secondary" role="button">취소</button>
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

export default OrderCustomerInfo;