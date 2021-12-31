import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ManageRoomHousekeeperPage from './pages/ManageRoomHousekeeperPage';

function Housekeeper(props) {
   return (
      <Routes>
         <Route path='rooms' element={<ManageRoomHousekeeperPage />} />
      </Routes>
   );
}

export default Housekeeper;
