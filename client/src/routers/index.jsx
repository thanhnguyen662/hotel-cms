import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Auth from '../features/Auth';
import Event from '../features/Event';
import Home from '../features/Home';
import Orders from '../features/Orders';
import Profile from '../features/Profile';
import Rooms from '../features/Rooms';
import Service from '../features/Service';

import Users from '../features/Users';
import MainLayout from '../layouts/Main';

import Event from '../features/Event';
import Orders from '../features/Orders';
//import { useSelector } from 'react-redux';
import Housekeeper from '../features/Housekeeper';
import Checkout from '../features/Checkout';


function Routers(props) {
   return (
      <>
         <Routes>
            <Route path='account/*' element={<Auth />} />
            <Route
               path='/'
               element={
                  <Protected>
                     <MainLayout />
                  </Protected>
               }
            >
               <Route path='users/*' element={<Users />} />
               <Route path='orders/*' element={<Orders />} />
               <Route path='rooms/*' element={<Rooms />} />
               <Route path='profile/*' element={<Profile />} />
               <Route path='service/*' element={<Service />} />
               <Route path='event/*' element={<Event />} />
               <Route path='housekeeper/*' element={<Housekeeper />} />
               <Route path='checkout/*' element={<Checkout />} />
               <Route path='/' element={<Home />} />
            </Route>
         </Routes>
      </>
   );
}

function Protected({ children }) {
   const navigate = useNavigate();
   let num = useRef(0);
   num.current = num.current + 1;
   const userRole = useSelector((state) => state.user?.role) || 'anonymous';
   console.log(userRole);
   if (userRole === 'anonymous' && num.current === 2) {
      console.log('IN');
      return navigate('/account/login');
   }
   return children;
}

export default Routers;
