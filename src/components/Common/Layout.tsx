import React from 'react';

import { Outlet } from 'react-router';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

// /. imports

const Layout: React.FC = () => {
    return (
        <div className="page">
            <Header />
            <main className="main">
                <Outlet />
            </main>
            <Footer/>
        </div>
    );
};

export default Layout;