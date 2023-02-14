import React from 'react';

import { useAppSelector } from '../../app/hooks';

import Banner from '../Banner/Banner';

import './footer.scss';

// /. imports

const Footer: React.FC = () => {
    const { isCookieAccepted } = useAppSelector(state => state.cookieSlice);

    // /. hooks

    return (
        <footer className="footer">
            <div className="footer__wrapper">
                {!isCookieAccepted && <Banner />}
            </div>
        </footer>
    );
};

export default Footer;
