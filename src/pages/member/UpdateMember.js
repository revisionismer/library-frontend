import React, { useEffect, useState } from 'react';
import { Link, Navigate, json, useLocation, useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

import Base64 from 'base-64';
import '../../assets/css/member/updateMember.css';

const UpdateMember = () => {
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

    const [user, setUser] = useState([]);

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

    return (
        <>
            <div className='container'>
                <div id='updatemember'>
                    <div className="p-5 mb-4 bg-body-tertiary rounded-3">
                        <div className="container-fluid py-5">
                            <h1 className="display-5 fw-bold"><span>회원 수정</span></h1>
                            <p className="col-md-8 fs-4">BookMarket</p>
                        </div>

                    </div>
                    <div id='updatemember_area'>

                        <div className="row align-items-md-stretch">
                            <form name="member" action="/BookMarket/members/update" method="post" >
                                <legend>회원 정보 수정</legend>
                                <div className="mb-3 row">
                                    <label className="col-sm-2 control-label">회원 ID </label>
                                    <div className="col-sm-3">
                                        <input type="text" name="memberId" className="form-control" defaultValue={user.username} readOnly />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label className="col-sm-2 control-label">이름</label>
                                    <div className="col-sm-3">
                                        <input type="text" name="name" className="form-control" defaultValue={user.name} />
                                    </div>
                                    <div className="col-sm-6">
                                        <p className="text-danger"></p>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label className="col-sm-2 control-label">비밀번호</label>
                                    <div className="col-sm-3">
                                        <input type="text" name="password" className="form-control" defaultValue="" />
                                    </div>
                                    <div className="col-sm-6">
                                        <p className="text-danger"></p>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label className="col-sm-2 control-label">비밀번호 확인</label>
                                    <div className="col-sm-3">
                                        <input type="text" name="password_confirm" className="form-control" defaultValue="" />
                                    </div>

                                </div>
                                <div className="mb-3 row">
                                    <label className="col-sm-2 control-label">자기소개</label>
                                    <div className="col-sm-8">
                                        <textarea type="text" name="bio" className="form-control" defaultValue={user.bio} />
                                    </div>
                                    <div className="col-sm-6">
                                        <p className="text-danger"></p>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label className="col-sm-2 control-label">전화번호</label>
                                    <div className="col-sm-3">
                                        <input type="text" name="phone" className="form-control" defaultValue={user.phone} />
                                    </div>
                                    <div className="col-sm-6">
                                        <p className="text-danger"></p>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label className="col-sm-2 control-label">홈페이지</label>
                                    <div className="col-sm-5">
                                        <input type="text" name="website" cols="50" rows="2" defaultValue={user.website} className="form-control" />
                                    </div>
                                </div>

                                <div id='updatememberBtn'>
                                    <input type="button" className="btn btn-success" value="수정" />
                                    <input type="button" className="btn btn-danger" value="삭제" />
                                    <input type="button" className="btn btn-secondary" value="취소" />
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdateMember;