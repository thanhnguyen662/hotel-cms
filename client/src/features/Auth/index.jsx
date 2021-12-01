import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import RegisterPage from './pages/RegisterPage';

function Auth(props) {
   return (
      <Routes>
         <Route path={`login`} element={<SignInPage />} />
         <Route path={`register`} element={<RegisterPage />} />
      </Routes>
   );
}

export default Auth;
