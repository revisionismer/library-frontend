import React from 'react';

import '../assets/css/home.css';

const Home = () => {
    return (
        <>
            <div className='container'>
                <div className='home'>
                    <div className='p-5 mb-4 bg-body-tertiary rounded-3'>
                        <div className='container-fluid py-5'>
                            <h1 className='display-5 fw-bold'>도서 쇼핑몰에 오신 것을 환영합니다</h1>
                            <p className='col-md-8 fs-4'>BookMarket</p>
                        </div>
                    </div>

                    <div className='row align-items-md-stretch text-center'>
                        <div className='col-md-12'>
                            <div className='h-100 p-5'>
                                <h2>Welcome to Web Market!</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;