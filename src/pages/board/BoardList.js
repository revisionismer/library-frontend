import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import '../../assets/css/board/boardList.css';

const BoardList = () => {
    return (
        <>
            <div className='container'>
                <div id='boardList'>
                    <div className="p-5 mb-4 bg-body-tertiary rounded-3">
                        <div className="container-fluid py-5">
                            <h1 className="display-5 fw-bold">게시판</h1>
                            <p className="col-md-8 fs-4">BookMarket</p>
                        </div>
                    </div>

                    <div id='boardList_area'>

                        <div className="row align-items-md-stretch">
                            <div className="text-end" style={{ paddingRight: '30px' }}>
                                전체 게시글: 1
                            </div>
                            <div style={{ paddingTop: '30px' }}>

                                <table className="table">
                                    <thead className="thead-light">
                                        <tr className="text-center">
                                            {/** <span th:text="${reverseSortDir} == 'asc'? '▼': '▲'" ></span> */}
                                            <th>#<Link to={`"@{'/board/page?pageNum=' + 1 + '&sortField=id&sortDir=' + 1}"`}><span></span></Link></th>
                                            <th>제목<Link to={`"@{'/board/page?pageNum=' + 1 + '&sortField=title&sortDir=' + 1}"`}><span></span></Link></th>
                                            <th>작성자<Link to={`"@{'/board/page?pageNum=' + 1 + '&sortField=writer&sortDir=' + 1}"`}><span></span></Link></th>
                                            <th>작성일<Link to={`"@{'/board/page?pageNum=' + 1 + '&sortField=createdDate&sortDir=' + 1}"`}><span></span></Link></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="text-center">
                                            <th scope="row">
                                                <span>1</span>
                                            </th>
                                            <td>
                                                <Link to={`/BookMarket/board/1/view`}>
                                                    <span>글쓰기 테스트 1</span>
                                                </Link>
                                            </td>
                                            <td>
                                                <span>관리자</span>
                                            </td>
                                            <td>
                                                <span>2025-01-29</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div>&nbsp;</div>

                                <div id='paging'>
                                    <div className="text-center">
                                        <div><i>Sorted by 정렬 필드 in 정렬 방법 board</i></div>
                                        <div>&nbsp;</div>
                                        <Link to={`/board/page?pageNum=1&sortField=name&sortDir=desc`}>First</Link>
                                        <span></span>
                                        &nbsp;&nbsp;

                                        <Link to={`/board/page?pageNum=0&sortField=name&sortDir=desc`}>Previous</Link>
                                        <span></span>

                                        &nbsp;&nbsp;

                                        <span>
                                            <Link to={`/board/page?pageNum=1&sortField=name&sortDir=desc`}>1</Link>
                                            <span></span>
                                            &nbsp;
                                        </span>

                                        <Link to={`/board/page?pageNum=1&sortField=name&sortDir=desc`}>Next</Link>
                                        <span></span>
                                        &nbsp;&nbsp;

                                        <Link to={`/board/page?pageNum=1&sortField=name&sortDir=desc`}>Last</Link>
                                        <span></span>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BoardList;