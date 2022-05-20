import React from 'react';

import SectionMark from '../../SectionMark/SectionMark';
import Form from '../../Form/Form';

// /. imports

const RegistrationPage: React.FC = () => {
    return (
        <div className="registration">
            <div className="registration__wrapper">
                <SectionMark />
                <Form />
            </div>
        </div>
    );
};

export default RegistrationPage;