import React from 'react';

import { Link } from 'react-router-dom';

import './relocate.scss';

// /. imports

const Relocate: React.FC = () => {
    return (
        <div className="relocate">
            <p className="relocate__create">Don't have an account? <Link to="/Authorisation-Form/Registration" className="relocate__link">Sign Up</Link></p>
            {/* <p className="relocate__login">Already have an account?<Link to="/Authorisation-Form" className="relocate__link">Log in</Link></p> */}
        </div>
    );
};

export default Relocate;