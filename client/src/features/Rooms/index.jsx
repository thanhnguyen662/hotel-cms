import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import RoomCreateModal from './components/RoomCreateModal';
import ManageRoomPage from './pages/ManageRoomPage';

function Room(props) {
   let location = useLocation();

   return (
      <>
         <Routes>
            <Route path='manage/*' element={<ManageRoomPage />}>
               <Route path=':roomNumber' element={<ManageRoomPage />} />
            </Route>
            <Route path='add' element={<ManageRoomPage />} />
         </Routes>

         {location.state?.backgroundLocation && (
            <Routes>
               <Route path='add' element={<RoomCreateModal />} />
            </Routes>
         )}
      </>
   );
}

export default Room;
