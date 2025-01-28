import React from 'react';
import { Link } from 'react-router-dom';

import '../../assets/css/cart/cart.css';

const Cart = () => {
    return (
        <>
            <div className='container'>
                <div className="p-5 mb-4 bg-body-tertiary rounded-3">
                    <div className="container-fluid py-5">
                        <h1 className="display-5 fw-bold">장바구니</h1>
                        <p className="col-md-8 fs-4">BookMarket</p>
                    </div>
                </div>
                <div id='cart'>
                    <div id='cart_area'>
                        <div id='cart_area_btn'>
                            <div className="row align-items-md-stretch">
                                <div className="col-md-12">
                                    <form name="clearForm" method="post">
                                        <input type="hidden" name="_method" value="delete" />
                                        <Link className="btn btn-danger" style={{ float: 'left' }}>삭제하기</Link>
                                        <button to='/BookMarket/order/1' className="btn btn-success text-right" style={{ float: 'right' }}>주문하기</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div style={{ paddingTop: '50px' }}>
                            <form id="cartForm" name="cartForm" method="post">
                                <input type="hidden" name="_method" value="delete" />
                                <table className="table table-hover text-center">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>도서</th>
                                            <th>가격</th>
                                            <th>수량</th>
                                            <th>소계</th>
                                            <th>비고</th>
                                            <th>-</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <input type='checkbox' id='selectBook' name='selectBook' />
                                            </td>
                                            <td>나루토 1권</td>
                                            <td>12000원</td>
                                            <td>3</td>
                                            <td>3</td>
                                            <td>신청 중</td>
                                            <td>
                                                <Link>
                                                    <span className="badge text-bg-danger">재고 부족</span>
                                                </Link>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                            <div className="text-end" style={{ paddingRight: '30px' }}>
                                <b> 총액 :
                                    <span>
                                        10000원
                                    </span>
                                </b>
                            </div>
                            <br />
                            <Link to="/BookMarket/books" className="btn btn-secondary "> &laquo; 쇼핑 계속하기</Link>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;