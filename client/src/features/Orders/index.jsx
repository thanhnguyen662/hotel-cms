import React from 'react';
import { Routes, Route } from 'react-router-dom';
import OrderPage from './pages/OrderPage';

function Orders(props) {
   return (
      <>
         <Routes>
            <Route path='order' element={<OrderPage />} />
            <Route path='order/:orderId' element={<OrderPage />} />
         </Routes>
      </>
   );
}

export default Orders;
