import React from 'react';

import { FcGoogle } from 'react-icons/fc';

import './buttonTemplate.scss';

// /. imports

const ButtonTemplate: React.FC = () => {
    return (
        <button className="button">
            <FcGoogle size={19} />
            <span>Continue with Google</span>
        </button>
    );
};

export default ButtonTemplate;