import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Auth from '../features/Auth';
import Home from '../features/Home';
import Manages from '../features/Manages';
import Profile from '../features/Profile';
import MainLayout from '../layouts/Main';

function Routers(props) {
   return (
      <>
         <Routes>
            <Route path='account/*' element={<Auth />} />
            <Route path='/' element={<MainLayout />}>
               <Route path='manages/*' element={<Manages />} />
               <Route path='profile/*' element={<Profile />} />
               <Route path='/' element={<Home />} />
            </Route>
         </Routes>
      </>
   );
}

export default Routers;
