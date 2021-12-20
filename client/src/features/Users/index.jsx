import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import AlertDialogBox from '../../components/AlertDialogBox';
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
               <Route
                  path='manage/delete/:userId'
                  element={<AlertDialogBox />}
               />
            </Routes>
         )}
      </>
   );
}

export default Users;
