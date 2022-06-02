import React from 'react';

import { Route, Routes } from 'react-router';

import './App.css';
import '../../assets/styles/style.scss';
import '../../assets/styles/theme.scss';

import Layout from '../Common/Layout';
import AuthorisationPage from '../Pages/AuthorisationPage/AuthorisationPage';
import RegistrationPage from '../Pages/RegistrationPage/RegistrationPage';
import HomePage from '../Pages/HomePage/HomePage';

// /. imports

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/Authorisation-Form" element={<Layout />}>
          <Route index element={<AuthorisationPage />} />
          <Route path="registration" element={<RegistrationPage />} />
          <Route path="home" element={<HomePage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
