import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import OrderDetailModal from './components/OrderDetailModal';
import CheckoutPage from './pages/CheckoutPage';

function Checkout(props) {
   let location = useLocation();

   return (
      <>
         <Routes>
            <Route path='' element={<CheckoutPage />} />
            <Route path=':orderId' element={<CheckoutPage />} />
         </Routes>
         {location.state?.backgroundLocation && (
            <Routes>
               <Route path=':orderId' element={<OrderDetailModal />} />
            </Routes>
         )}
      </>
   );
}

export default Checkout;
