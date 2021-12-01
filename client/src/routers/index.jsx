import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Auth from '../features/Auth';
import Home from '../features/Home';
import MainLayout from '../layouts/Main';

function Routers(props) {
   return (
      <>
         <Routes>
            <Route path='account/*' element={<Auth />} />
            <Route path='/' element={<MainLayout />}>
               <Route path='/' element={<Home />} />
            </Route>
         </Routes>
      </>
   );
}

export default Routers;
