import React from 'react';

import { useSelector } from 'react-redux';

import { Outlet } from 'react-router';

import { RootState } from '../../app/store';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import Preloader from './Preloader/Preloader';


// /. imports

const Layout: React.FC = () => {

    const { isPreloaderVisible } = useSelector((state: RootState) => state.mainSlice);

    return (
        <div className="page">
            <Header />
            <main className="main">
                <>
                    <Outlet />
                    {isPreloaderVisible
                        ? <div className="page__preloader">
                            <Preloader />
                        </div>
                        : <></>}
                </>
            </main>
            <Footer />
        </div>
    );
};

export default Layout;