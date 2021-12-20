import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ManageEvent from './pages/ManageEvent';

function Room(props) {
   return (
      <Routes>
         <Route path='manage/*' element={<ManageEvent />}></Route>
      </Routes>
   );
}

export default Room;
