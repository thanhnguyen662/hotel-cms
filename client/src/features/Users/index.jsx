import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import EditProfileModal from './components/EditProfileModel';
import ManageUserPage from './pages/ManageUserPage';

function Users(props) {
   let location = useLocation();

   return (
      <>
         <Routes>
            <Route path='/manage' element={<ManageUserPage />}>
               <Route path='edit/:userId' element={<ManageUserPage />} />
               <Route path='delete/:userId' element={<ManageUserPage />} />
            </Route>
         </Routes>
         {location.state?.backgroundLocation && (
            <Routes>
               <Route
                  path='manage/edit/:userId'
                  element={<EditProfileModal />}
               />
            </Routes>
         )}
      </>
   );
}

export default Users;
