import React from 'react';

import { Outlet } from 'react-router';

import Header from '../Header/Header';

// /. imports

const Layout: React.FC = () => {
    return (
        <div className="page">
            <Header />
            <main className="main">
                <Outlet />
            </main>
            <footer></footer>
        </div>
    );
};

export default Layout;