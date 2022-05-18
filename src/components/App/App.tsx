import React from 'react';

import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import '../../assets/styles/style.scss';

import Layout from '../Common/Layout';
import AuthorisationPage from '../Pages/AuthorisationPage/AuthorisationPage';
import RegistrationPage from '../Pages/RegistrationPage/RegistrationPage';

// /. imports

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/Authorisation-Form" element={<Layout />}>
            <Route index element={<AuthorisationPage />} />
            <Route path="registration" element={<RegistrationPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>

  );
};

export default App;
