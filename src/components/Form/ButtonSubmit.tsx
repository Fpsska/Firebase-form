import React from 'react';

// /. imports

interface propTypes {
    isValid: boolean;
    pageStatuses: { [key: string]: boolean };
}

// /. interfaces

const ButtonSubmit: React.FC<propTypes> = ({ isValid, pageStatuses }) => {
    return (
        <button
            className="form__button"
            type="submit"
            disabled={!isValid}
        >
            {pageStatuses.isAuthPage ? 'Log in' : 'Get Started'}
        </button>
    );
};

export default ButtonSubmit;
