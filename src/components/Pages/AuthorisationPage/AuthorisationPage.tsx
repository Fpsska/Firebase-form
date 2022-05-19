import React from 'react';

import SectionMark from '../../SectionMark/SectionMark';
import Form from '../../Form/Form';

// /. imports

const AuthorisationPage: React.FC = () => {
    return (
        <div className="authorisation">
            <div className="authorisation__wrapper">
                <SectionMark />
                <Form />
            </div>
        </div>
    );
};

export default AuthorisationPage;