import React from 'react';

import Relocate from '../Relocate/Relocate';

import './footer.scss';

// /. imports

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer__wrapper">
                <Relocate/>
            </div>
        </footer>
    );
};

export default Footer;