import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import MainLayout from './layouts/Main';
import '@fontsource/raleway/400.css';
import '@fontsource/open-sans/700.css';
import theme from './theme';

function App() {
   return (
      <ChakraProvider theme={theme}>
         <MainLayout>
            <h1>Hello</h1>
         </MainLayout>
      </ChakraProvider>
   );
}

export default App;
