import React from 'react';

import { useAppSelector } from '../../app/hooks';

import Relocate from '../Relocate/Relocate';

import { RootState } from '../../app/store';

import './footer.scss';

// /. imports

const Footer: React.FC = () => {

    const { isHomePage } = useAppSelector((state: RootState) => state.mainSlice);

    return (
        <footer className="footer">
            <div className="footer__wrapper">
                {isHomePage ? <></> : <Relocate />}
            </div>
        </footer>
    );
};

export default Footer;