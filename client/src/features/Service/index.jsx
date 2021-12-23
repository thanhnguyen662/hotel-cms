import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ServiceManage from './pages/ServiceManage';
import ServiceOrder from './pages/ServiceOrder';

function Service(props) {
   return (
      <Routes>
         <Route path='manage/*' element={<ServiceManage />}></Route>
         <Route path='order/*' element={<ServiceOrder />}></Route>
      </Routes>
   );
}

export default Service;
