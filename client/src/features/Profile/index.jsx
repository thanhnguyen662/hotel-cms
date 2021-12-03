import React from 'react';
import { Route, Routes } from 'react-router';
import ProfilePage from './pages/ProfilePage';

function Profile(props) {
   return (
      <>
         <Routes>
            <Route path=':userId' element={<ProfilePage />} />
         </Routes>
      </>
   );
}

export default Profile;
