import React from 'react';
import { Link } from 'react-router-dom';

import '../../assets/css/book/addBook.css';

const AddBook = () => {
    return (
        <>
            <div className='container'>
                <div id='addbook'>
                    <div className="p-5 mb-4 bg-body-tertiary rounded-3">
                        <div className="container-fluid py-5">
                            <h1 className="display-5 fw-bold"><span>도서등록</span></h1>
                            <p className="col-md-8 fs-4">BookMarket</p>
                        </div>

                    </div>
                    <div id='addbook_area'>
                        <div className="row align-items-md-stretch">
                            <div id='text-end' className="text-end" style={{ padding: '10px', borderBottom: '1px  solid #ddd' }}>
                                <form action="/BookMarket/logout" method="POST">
                                    <Link to="?lang=ko" style={{ textDecorationLine: 'none' }}>Korean</Link>|
                                    <Link to="?lang=en" style={{ textDecorationLine: 'none' }}>English</Link>
                                    <input type="button" className="btn btn-sm btn-success" value="Logout" />
                                </form>
                            </div>
                            <legend className='text-end'></legend>
                            <div id='bookWriteForm'>
                                <form action="/BookMarket/books/add" method="post" encType="multipart/form-data">
                                    <div className="mb-3 row">
                                        <label className="col-sm-2 control-label"><span>bookId</span></label>
                                        <div className="col-sm-3">
                                            <input type="text" name="bookId" className="form-control" />
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="text-danger" />
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label className="col-sm-2 control-label" ><span>name</span></label>
                                        <div className="col-sm-3">
                                            <input type="text" name="name" className="form-control" />
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="text-danger" />
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label className="col-sm-2 control-label" ><span>unitPrice</span></label>
                                        <div className="col-sm-3">
                                            <input type="text" name="unitPrice" className="form-control" />
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="text-danger" />
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label className="col-sm-2 control-label" ><span>author</span></label>
                                        <div className="col-sm-3">
                                            <input type="text" name="author" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label className="col-sm-2 control-label" ><span>description</span></label>
                                        <div className="col-sm-5">
                                            <textarea type="text" name="description" cols="50" rows="2" className="form-control"></textarea>
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label className="col-sm-2 control-label" ><span>publisher</span></label>
                                        <div className="col-sm-3">
                                            <input type="text" name="publisher" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label className="col-sm-2 control-label" ><span>category</span></label>
                                        <div className="col-sm-3">
                                            <input type="text" name="category" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label className="col-sm-2 control-label" ><span>unitsInStock</span></label>
                                        <div className="col-sm-3">
                                            <input type="text" name="unitsInStock" className="form-control" />
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="text-danger" />
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label className="col-sm-2 control-label" ><span>releaseDate</span></label>
                                        <div className="col-sm-3">
                                            <input type="text" name="releaseDate" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label className="col-sm-2 control-label" ><span>condition</span></label>
                                        <div id='book_status' className="col-sm-3">
                                            <input type="radio" name="condition" value="New" /> New
                                            <input type="radio" name="condition" value="Old" /> Old
                                            <input type="radio" name="condition" value="E-Book" /> E-Book
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label className="col-sm-2 control-label" ><span>bookImage</span></label>
                                        <div className="col-sm-7">
                                            <input type="file" name="bookImage" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <div className="col-sm-offset-2 col-sm-10" >
                                            <button type="submit" className="btn btn-primary">submit</button>
                                        </div>
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