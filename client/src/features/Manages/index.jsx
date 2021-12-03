import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ManageUserPage from './pages/ManageUserPage';

function Manages(props) {
   return (
      <Routes>
         <Route path='/user' element={<ManageUserPage />} />
      </Routes>
   );
}

export default Manages;
