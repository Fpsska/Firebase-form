import React from 'react';

import { useAppSelector } from '../../app/hooks';

import Relocate from '../Relocate/Relocate';

import './footer.scss';

// /. imports

const Footer: React.FC = () => {

    const { isHomePage } = useAppSelector(state => state.mainSlice);

    return (
        <footer className="footer">
            <div className="footer__wrapper">
                {isHomePage ? <></> : <Relocate />}
            </div>
        </footer>
    );
};

export default Footer;