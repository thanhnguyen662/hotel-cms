import { SearchIcon } from '@chakra-ui/icons';
import { Button, HStack, Input, InputGroup, Select } from '@chakra-ui/react';
import React, { useState } from 'react';

CheckoutToolbar.propTypes = {};

function CheckoutToolbar(props) {
   const { handleSearchRoom } = props;
   const [searchData, setSearchData] = useState({});

   const handleChangeSearch = (key, value) => {
      setSearchData((prev) => {
         return {
            ...prev,
            [key]: value,
         };
      });
   };

   return (
      <HStack w='full'>
         <Select
            placeholder='Select order type'
            flex='1'
            onChange={(e) => handleChangeSearch('orderType', e.target.value)}
         >
            <option value='all'>All</option>
            <option value='paid'>Paid</option>
            <option value='unpaid'>Unpaid</option>
         </Select>
         <InputGroup flex='2'>
            <Input
               placeholder='Search room'
               onChange={(e) =>
                  handleChangeSearch('roomNumber', e.target.value)
               }
            />
         </InputGroup>
         <Button
            colorScheme='blue'
            leftIcon={<SearchIcon />}
            onClick={() => handleSearchRoom(searchData)}
         >
            Search
         </Button>
      </HStack>
   );
}

export default CheckoutToolbar;
