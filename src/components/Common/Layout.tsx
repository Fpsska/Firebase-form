import React from 'react';

import { Outlet } from 'react-router';

import { useAppSelector } from '../../app/hooks';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import Banner from '../Banner/Banner';

import Preloader from './Preloader/Preloader';

// /. imports

const Layout: React.FC = () => {
    const { isPreloaderVisible } = useAppSelector(state => state.mainSlice);
    const { isCookieAccepted } = useAppSelector(state => state.cookieSlice);

    // /. hooks

    return (
        <div className="page">
            <Header />
            <main className="main">
                <>
                    <Outlet />
                    {isPreloaderVisible && (
                        <div className="page__preloader">
                            <Preloader />
                        </div>
                    )}
                </>
            </main>
            <Footer />
            <>{!isCookieAccepted && <Banner />}</>
        </div>
    );
};

export default Layout;
