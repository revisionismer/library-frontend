import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import '../../assets/css/book/bookList.css';

import none from '../../assets/img/none.gif';

const BookList = () => {
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
                            <div className="col-md-4">
                                <img src={none} alt="image" style={{ width: '60%' }} />
                                <h3>none.gif</h3>
                                <p>작가</p>
                                <p>출판사</p>
                                <p style={{ textAlign: 'left' }}>13000원</p>
                                <p><Link to={`/BookMarket/books/1/detail`} className='btn btn-secondary' role='button'>상세 정보</Link></p>
                            </div>
                            <div className="col-md-4">
                                <img src={none} alt="image" style={{ width: '60%' }} />
                                <h3>none.gif</h3>
                                <p>작가</p>
                                <p>출판사</p>
                                <p style={{ textAlign: 'left' }}>13000원</p>
                                <p><Link to={`/BookMarket/books/2/detail`} className='btn btn-secondary' role='button'>상세 정보</Link></p>
                            </div>
                            <div className="col-md-4">
                                <img src={none} alt="image" style={{ width: '60%' }} />
                                <h3>none.gif</h3>
                                <p>작가</p>
                                <p>출판사</p>
                                <p style={{ textAlign: 'left' }}>13000원</p>
                                <p><Link to={`/BookMarket/books/3/detail`} className='btn btn-secondary' role='button'>상세 정보</Link></p>
                            </div>
                            <div className="col-md-4">
                                <img src={none} alt="image" style={{ width: '60%' }} />
                                <h3>none.gif</h3>
                                <p>작가</p>
                                <p>출판사</p>
                                <p style={{ textAlign: 'left' }}>13000원</p>
                                <p><Link to={`/BookMarket/books/4/detail`} className='btn btn-secondary' role='button'>상세 정보</Link></p>
                            </div>
                            <div className="col-md-4">
                                <img src={none} alt="image" style={{ width: '60%' }} />
                                <h3>none.gif</h3>
                                <p>작가</p>
                                <p>출판사</p>
                                <p style={{ textAlign: 'left' }}>13000원</p>
                                <p><Link to={`/BookMarket/books/5/detail`} className='btn btn-secondary' role='button'>상세 정보</Link></p>
                            </div>
                            <div className="col-md-4">
                                <img src={none} alt="image" style={{ width: '60%' }} />
                                <h3>none.gif</h3>
                                <p>작가</p>
                                <p>출판사</p>
                                <p style={{ textAlign: 'left' }}>13000원</p>
                                <p><Link to={`/BookMarket/books/6/detail`} className='btn btn-secondary' role='button'>상세 정보</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookList;