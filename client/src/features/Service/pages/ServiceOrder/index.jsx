import { SearchIcon } from '@chakra-ui/icons';
import {
   Box,
   Heading,
   Input,
   InputGroup,
   InputLeftElement,
   Stack,
   Text,
} from '@chakra-ui/react';
import React, { useState, useRef } from 'react';

ServiceOrder.propTypes = {};

function ServiceOrder(props) {
   // STATE
   const [searchData, setSearchData] = useState({ search: '' });
   //REF
   const timeout = useRef(null);
   //FUNCTION
   const handleOnSearchChange = (data) => {
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
         setSearchData({ search: data });
      }, 400);
   };
   return (
      <Stack direction={['column', 'row']} spacing='24px' minH='82vh'>
         <Box flex='1' bg='white' boxShadow='xl' rounded='lg' p='5'>
            <Heading fontSize='25' mb='2'>
               Order Services
            </Heading>
            <Text mb='6'>Manage all existing order in the hotel</Text>
            <InputGroup flex='2'>
               <InputLeftElement
                  pointerEvents='none'
                  children={<SearchIcon color='gray.300' />}
               />
               <Input
                  placeholder='Search by customer name, customer ID or phone number'
                  onChange={(e) => handleOnSearchChange(e.target.value)}
               />
            </InputGroup>
         </Box>
      </Stack>
   );
}

export default ServiceOrder;
