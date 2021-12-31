import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/inter';
import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserProfile } from './features/Auth/authSlice';
import Routers from './routers';
import theme from './theme';

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
