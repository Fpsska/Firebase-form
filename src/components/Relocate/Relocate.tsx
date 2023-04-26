import React from 'react';

import { Link } from 'react-router-dom';

import { useAppSelector } from 'app/hooks';

import './relocate.scss';

// /. imports

const Relocate: React.FC = () => {
    const { pageStatuses } = useAppSelector(state => state.mainSlice);

    // /. hooks

    return (
        <div className="relocate">
            {pageStatuses.isAuthPage ? (
                <p className="relocate__create">
                    Don`t have an account?{' '}
                    <Link
                        className="relocate__link"
                        to="/Registration"
                    >
                        Sign Up
                    </Link>
                </p>
            ) : (
                <p className="relocate__login">
                    Already have an account?{' '}
                    <Link
                        className="relocate__link"
                        to="/"
                    >
                        Log in
                    </Link>
                </p>
            )}
        </div>
    );
};

export default Relocate;
