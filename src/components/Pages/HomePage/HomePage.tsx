import React from 'react';

import { Navigate } from 'react-router';

// /. imports

const HomePage: React.FC = () => {
    return (
        <div>
            <span>HomePage</span>
            <Navigate to="/Authorisation-Form" />
        </div>
    );
};

export default HomePage;

