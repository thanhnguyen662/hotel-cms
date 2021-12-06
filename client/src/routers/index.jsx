import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Auth from '../features/Auth';
import Home from '../features/Home';
import Users from '../features/Users';
import Profile from '../features/Profile';
import Rooms from '../features/Rooms';
import MainLayout from '../layouts/Main';

function Routers(props) {
   return (
      <>
         <Routes>
            <Route path='account/*' element={<Auth />} />
            <Route path='/' element={<MainLayout />}>
               <Route path='users/*' element={<Users />} />
               <Route path='rooms/*' element={<Rooms />} />
               <Route path='profile/*' element={<Profile />} />
               <Route path='/' element={<Home />} />
            </Route>
         </Routes>
      </>
   );
}

export default Routers;
