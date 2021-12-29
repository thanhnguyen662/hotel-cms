import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ServiceManage from './pages/ServiceManage';
import ServiceOrder from './pages/ServiceOrder';
import ServiceOrderDetail from './pages/ServiceOrderDetail';

function Service(props) {
   return (
      <Routes>
         <Route path='manage' element={<ServiceManage />} />
         <Route path='order/:orderId' element={<ServiceOrderDetail />} />
         <Route path='order' element={<ServiceOrder />} />
      </Routes>
   );
}

export default Service;
