import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ManageUserPage from './pages/ManageUserPage';

function Users(props) {
   return (
      <Routes>
         <Route path='/manage' element={<ManageUserPage />} />
      </Routes>
   );
}

export default Users;
