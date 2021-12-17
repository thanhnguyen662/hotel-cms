import { ChakraProvider } from '@chakra-ui/react';
import React, { useEffect } from 'react';
// import '@fontsource/raleway/500.css';
// import '@fontsource/open-sans/700.css';
import theme from './theme';
import Routers from './routers';
import { useDispatch } from 'react-redux';
import { getUserProfile } from './features/Auth/authSlice';
import { unwrapResult } from '@reduxjs/toolkit';

function App() {
   const dispatch = useDispatch();

   useEffect(() => {
      const actionResult = dispatch(getUserProfile());
      unwrapResult(actionResult);
   }, [dispatch]);

   return (
      <ChakraProvider theme={theme}>
         <Routers />
      </ChakraProvider>
   );
}

export default App;
