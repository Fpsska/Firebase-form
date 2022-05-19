import React from 'react';

import SectionMark from '../../SectionMark/SectionMark';
import Form from '../../Form/Form';
import Relocate from '../../Relocate/Relocate';

// /. imports

const AuthorisationPage: React.FC = () => {
    return (
        <div className="authorisation">
            <div className="authorisation__wrapper">
                <SectionMark />
                <Form />
                <Relocate/>
            </div>
        </div>
    );
};

export default AuthorisationPage;