import React, { useEffect } from 'react';

import { Route, Routes } from 'react-router';

import { useAppDispatch } from '../../app/hooks';
import { useLocationData } from '../../hooks/useLocationData';

import { switchPageStatus } from '../../app/slices/mainSlice';

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
    const dispatch = useAppDispatch();
    const location = useLocationData();

    // /. hooks

    useEffect(() => {
        dispatch(switchPageStatus({ locationData: location }));
    }, [location]);

    // /. effects

    return (
        <div className="App">
            <Routes>
                <Route
                    path="/Authorisation-Form"
                    element={<Layout />}
                >
                    <Route
                        index
                        element={<AuthorisationPage />}
                    />
                    <Route
                        path="registration"
                        element={<RegistrationPage />}
                    />
                    <Route
                        path="home"
                        element={<HomePage />}
                    />
                </Route>
            </Routes>
        </div>
    );
};

export default App;
