import React from 'react';

import { Outlet } from 'react-router';

import { useAppSelector } from '../../app/hooks';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Relocate from '../Relocate/Relocate';

import Preloader from './Preloader/Preloader';

// /. imports

const Layout: React.FC = () => {
    const { isPreloaderVisible, pageStatuses } = useAppSelector(
        state => state.mainSlice
    );

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
                    {pageStatuses.isHomePage ? <></> : <Relocate />}
                </>
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
