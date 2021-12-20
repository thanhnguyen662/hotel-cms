import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Foods from './pages/ManageFoodsPage';
import FoodService from './pages/FoodService';

function Room(props) {
   return (
      <Routes>
         <Route path='manage/*' element={<Foods />}></Route>
         <Route path='order/*' element={<FoodService />}></Route>
      </Routes>
   );
}

export default Room;
