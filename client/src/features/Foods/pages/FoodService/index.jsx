import { Box, Stack } from '@chakra-ui/react';
import React from 'react';

FoodService.propTypes = {};

function FoodService(props) {
   return (
      <Stack direction={['column', 'row']} spacing='24px' minH='82vh'>
         <Box flex='1' bg='white' boxShadow='xl' rounded='lg' p='5'></Box>
      </Stack>
   );
}

export default FoodService;
