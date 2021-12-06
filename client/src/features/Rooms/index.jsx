import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ManageRoomPage from './pages/ManageRoomPage';

function Room(props) {
   return (
      <Routes>
         <Route path='manage' element={<ManageRoomPage />} />
      </Routes>
   );
}

export default Room;
