import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import '@fontsource/raleway/500.css';
import '@fontsource/open-sans/700.css';
import theme from './theme';
import Routers from './routers';

function App() {
   return (
      <ChakraProvider theme={theme}>
         <Routers />
      </ChakraProvider>
   );
}

export default App;
