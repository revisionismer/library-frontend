import React from 'react';
import { Link } from 'react-router-dom';

import '../../assets/css/order/orderList.css';

const OrderList = () => {
    return (
        <>
            <div className='container'>
                <div id='orderList'>
                    <div className="p-5 mb-4 bg-body-tertiary rounded-3">
                        <div className="container-fluid py-5">
                            <h1 className="display-5 fw-bold">주문목록</h1>
                            <p className="col-md-8 fs-4">BookMarket</p>
                        </div>
                    </div>
                    <div id='orderList_area'>
                        <div className="row align-items-md-stretch">
                            <div id='orderList_area_btn'>
                                <div className="col-md-12">
                                    <div>
                                        <input type="hidden" name="_method" value="delete" />
                                        <Link className="btn btn-danger" style={{ float: 'left' }}>삭제하기</Link>
                                    </div>
                                    <div>
                                        <input type="button" className="btn btn-success text-right" style={{ float: 'right' }} value="Logout" />
                                    </div>
                                </div>
                            </div>

                            <div style={{ paddingTop: "50px" }}>
                                <div className="text-end" style={{ paddingRight: '30px' }}>전체 주문수: 0</div>

                                <table className="table table-hover text-center">
                                    <thead>
                                        <tr>
                                            <th><Link to={`@{'/order/page?pageNum=' + 1 + '&sortField=orderId&sortDir=' + reverseSortDir}`}>주문 ID</Link></th>
                                            <th><Link to={`@{'/order/page?pageNum=' + 1 + '&sortField=customer_id&sortDir=' + reverseSortDir}`}>고객 ID</Link></th>
                                            <th><Link to={`@{'/order/page?pageNum=' + 1 + '&sortField=shipping_id&sortDir=' + reverseSortDir}`}>베송지</Link></th>
                                            <th><Link to={`@{'/order/page?pageNum=' + 1 + '&sortField=grandTotal&sortDir=' + reverseSortDir}`}>총액</Link></th>
                                            <th>비고</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>orderId</td>
                                            <td>customer.id</td>
                                            <td>delivery address</td>
                                            <td>grandTotal</td>
                                            <td id='orderListBtn' style={{ display: 'flex', justifyContent: 'center' }}>
                                                <Link to={`@{'/order/view/' + 1`}><span className="badge text-bg-secondary">상세보기</span></Link>
                                                <Link to={`@{'/order/edit/' + 1`}><span className="badge text-bg-warning">수정</span></Link>
                                                <Link to={`@{'/order/delete/' + 1`}><span className="badge text-bg-danger">삭제</span></Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>orderId</td>
                                            <td>customer.id</td>
                                            <td>delivery address</td>
                                            <td>grandTotal</td>
                                            <td id='orderListBtn' style={{ display: 'flex', justifyContent: 'center' }}>
                                                <Link to={`@{'/order/view/' + 1`}><span className="badge text-bg-secondary">상세보기</span></Link>
                                                <Link to={`@{'/order/edit/' + 1`}><span className="badge text-bg-warning">수정</span></Link>
                                                <Link to={`@{'/order/delete/' + 1`}><span className="badge text-bg-danger">삭제</span></Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>orderId</td>
                                            <td>customer.id</td>
                                            <td>delivery address</td>
                                            <td>grandTotal</td>
                                            <td id='orderListBtn' style={{ display: 'flex', justifyContent: 'center' }}>
                                                <Link to={`@{'/order/view/' + 1`}><span className="badge text-bg-secondary">상세보기</span></Link>
                                                <Link to={`@{'/order/edit/' + 1`}><span className="badge text-bg-warning">수정</span></Link>
                                                <Link to={`@{'/order/delete/' + 1`}><span className="badge text-bg-danger">삭제</span></Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>orderId</td>
                                            <td>customer.id</td>
                                            <td>delivery address</td>
                                            <td>grandTotal</td>
                                            <td id='orderListBtn' style={{ display: 'flex', justifyContent: 'center' }}>
                                                <Link to={`@{'/order/view/' + 1`}><span className="badge text-bg-secondary">상세보기</span></Link>
                                                <Link to={`@{'/order/edit/' + 1`}><span className="badge text-bg-warning">수정</span></Link>
                                                <Link to={`@{'/order/delete/' + 1`}><span className="badge text-bg-danger">삭제</span></Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>orderId</td>
                                            <td>customer.id</td>
                                            <td>delivery address</td>
                                            <td>grandTotal</td>
                                            <td id='orderListBtn' style={{ display: 'flex', justifyContent: 'center' }}>
                                                <Link to={`@{'/order/view/' + 1`}><span className="badge text-bg-secondary">상세보기</span></Link>
                                                <Link to={`@{'/order/edit/' + 1`}><span className="badge text-bg-warning">수정</span></Link>
                                                <Link to={`@{'/order/delete/' + 1`}><span className="badge text-bg-danger">삭제</span></Link>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>


                        </div>


                    </div>
                </div>
            </div >
        </>
    );
};

export default OrderList;