import React, { useEffect, useState } from 'react';

import '../../assets/css/member/updateMember.css';

const UpdateMember = () => {
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
                                        <input type="text" name="memberId" className="form-control" readOnly />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label className="col-sm-2 control-label">이름</label>
                                    <div className="col-sm-3">
                                        <input type="text" name="name" className="form-control" defaultValue="" />
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
                                    <label className="col-sm-2 control-label">이메일</label>
                                    <div className="col-sm-3">
                                        <input type="text" name="email" className="form-control" defaultValue="" />
                                    </div>
                                    <div className="col-sm-6">
                                        <p className="text-danger"></p>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label className="col-sm-2 control-label">전화번호</label>
                                    <div className="col-sm-3">
                                        <input type="text" name="phone" className="form-control" defaultValue="" />
                                    </div>
                                    <div className="col-sm-6">
                                        <p className="text-danger"></p>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label className="col-sm-2 control-label">주소</label>
                                    <div className="col-sm-5">
                                        <input type="text" name="address" cols="50" rows="2" className="form-control" defaultValue="" />
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