import React from 'react';

import { Outlet } from 'react-router';

import { useAppSelector } from 'app/hooks';

import Header from 'components/layout/Header/Header';
import Footer from 'components/layout/Footer/Footer';
import Relocate from 'components/ui/Relocate/Relocate';

import Preloader from '../ui/Preloader/Preloader';

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
                    {pageStatuses.isHomePage ? (
                        <></>
                    ) : (
                        <Relocate additionalClass="indent" />
                    )}
                </>
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
