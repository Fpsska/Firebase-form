import React, { useEffect, useRef } from 'react';

import { Route, Routes } from 'react-router';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useLocationData } from '../../hooks/useLocationData';

import { switchPageStatus } from '../../app/slices/mainSlice';

import { switchModalVisibleStatus } from '../../app/slices/modalSlice';

import { setSessionTime } from '../../app/slices/userSlice';

import Layout from '../Common/Layout';
import AuthorisationPage from '../Pages/AuthorisationPage/AuthorisationPage';
import RegistrationPage from '../Pages/RegistrationPage/RegistrationPage';
import HomePage from '../Pages/HomePage/HomePage';

import './App.css';
import '../../assets/styles/_reset.scss';
import '../../assets/styles/style.scss';
import '../../assets/styles/_theme.scss';
import '../../assets/styles/_media.scss';

// /. imports

const App: React.FC = () => {
    const { isUserAuthorise } = useAppSelector(state => state.userSlice);

    const dispatch = useAppDispatch();
    const location = useLocationData();

    const appRef = useRef<HTMLDivElement>(null);

    // /. hooks

    useEffect(() => {
        // set current page, modal status
        dispatch(switchPageStatus({ locationData: location }));
        dispatch(switchModalVisibleStatus({ name: 'reset', status: false }));
    }, [location]);

    useEffect(() => {
        // reset currentSessionTime
        if (!isUserAuthorise) {
            dispatch(setSessionTime(0));
        }
    }, [isUserAuthorise]);

    // /. effects

    return (
        <div
            className="App"
            ref={appRef}
        >
            <Routes>
                <Route
                    path="/Authorisation-Form"
                    element={<Layout />}
                >
                    <Route
                        index
                        element={<AuthorisationPage wrapperRef={appRef} />}
                    />
                    <Route
                        path="registration"
                        element={<RegistrationPage wrapperRef={appRef} />}
                    />
                    <Route
                        path="home"
                        element={<HomePage wrapperRef={appRef} />}
                    />
                </Route>
            </Routes>
        </div>
    );
};

export default App;
