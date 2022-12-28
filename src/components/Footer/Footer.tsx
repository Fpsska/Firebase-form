import React from 'react';

import { useAppSelector } from '../../app/hooks';
import { useLocationData } from '../../hooks/useLocationData';

import Relocate from '../Relocate/Relocate';

import './footer.scss';

// /. imports

const Footer: React.FC = () => {
    const { pageStatuses } = useAppSelector(state => state.mainSlice);

    // /. hooks

    return (
        <footer className="footer">
            <div className="footer__wrapper">
                {pageStatuses.isHomePage ? <></> : <Relocate />}
            </div>
        </footer>
    );
};

export default Footer;
