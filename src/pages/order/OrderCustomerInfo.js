import React from 'react';

// 주문하는 고객 ID정보 가져오고(로그인한 회원)
// 성명(로그인한 회원)
// 전화번호
// 국가명
// 주소
// 세부주소

const OrderCustomerInfo = () => {
    return (
        <>
            <div className='container'>
                <div className="p-5 mb-4 bg-body-tertiary rounded-3">
                    <div className="container-fluid py-5">
                        <h1 className="display-5 fw-bold">주문 고객</h1>
                        <p className="col-md-8 fs-4">BookMarket</p>
                    </div>
                </div>
                <div id='orderCustomerInfo'>
                    <div id='orderCustomerInfo_area'>
                        <div className="row align-items-md-stretch">

                            <form id='orderCustomerForm' method="post">
                                <input type="hidden" name="cart" className="form-control" defaultValue={1}></input>
                                <label>고객 세부 사항</label>
                                <div className="mb-3 row">
                                    <label className="col-sm-2 control-label">고객 ID </label>
                                    <div className="col-sm-3">
                                        <input type="text" name="customerId" className="form-control" defaultValue={"customerId"} />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label className="col-sm-2 control-label">성명</label>
                                    <div className="col-sm-3">
                                        <input type="text" name="name" className="form-control" defaultValue={"name"} />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label className="col-sm-2 control-label">전화번호</label>
                                    <div className="col-sm-3">
                                        <input type="text" name="phone" className="form-control" defaultValue={"phone"} />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label className="col-sm-2 control-label">국가명</label>
                                    <div className="col-sm-3">
                                        <input type="text" name="country" className="form-control" defaultValue={"country"} />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label className="col-sm-2 control-label">우편번호</label>
                                    <div className="col-sm-3">
                                        <input type="text" name="zipcode" className="form-control" defaultValue={"zipcode"} />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label className="col-sm-2 control-label">주소</label>
                                    <div className="col-sm-5">
                                        <input type="text" name="addressname" height="50" width="2" className="form-control" defaultValue={"addressname"} />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label className="col-sm-2 control-label">세부주소</label>
                                    <div className="col-sm-3">
                                        <input type="text" name="detailname" className="form-control" defaultValue={"detailname"} />
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <div className="col-sm-offset-2 col-sm-10">
                                        <input type="submit" className="btn btn-primary" value="등록" />
                                        <button className="btn btn-Secondary" role="button">취소</button>
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