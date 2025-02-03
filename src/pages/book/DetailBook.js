import React from 'react';

import { Link } from 'react-router-dom';

import none from '../../assets/img/none.gif';

import '../../assets/css/book/detailBook.css';

const DetailBook = () => {
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
                                <img src={none} style={{ width: '100%' }} />
                                <div className="text-center">
                                    <button type='button'>이미지다운로드</button>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <h3>제목</h3>
                                <p>상세 설명</p>
                                <br />
                                <p><b>도서코드 : </b><span className="badge text-bg-info"></span></p>
                                <p><b>저자</b> : <span>저자</span></p>
                                <p><b>출판사</b> : <span>출판사</span></p>
                                <p><b>출판일</b> : <span>출판일</span></p>
                                <p><b>분류</b> : <span>분류</span></p>
                                <p><b>재고</b> : <span>100</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailBook;