import { SearchIcon } from '@chakra-ui/icons';
import { Button, HStack, Input, InputGroup, Select } from '@chakra-ui/react';
import React, { useState } from 'react';

SearchRoomHouseKeeper.propTypes = {};

function SearchRoomHouseKeeper(props) {
   const { handleSearchRoom } = props;
   const [searchData, setSearchData] = useState({});
   // const timeout = useRef(null);

   // const handleOnSearchChange = (searchKeyword) => {
   //    if (timeout.current) clearTimeout(timeout.current);
   //    timeout.current = setTimeout(() => {
   //       handleSearchRoom(searchKeyword);
   //    }, 400);
   // };

   const handleChangeSearch = (key, value) => {
      setSearchData((prev) => {
         return {
            ...prev,
            [key]: value,
         };
      });
   };

   return (
      <>
         <HStack>
            <Select
               placeholder='Select option'
               flex='1'
               onChange={(e) =>
                  handleChangeSearch('roomStatus', e.target.value)
               }
            >
               <option value='VC'>Vacant & Clean</option>
               <option value='VD'>Vacant & Dirty</option>
               <option value='OC'>Occupied & Clean</option>
               <option value='OD'>Occupied & Dirty</option>
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
      </>
   );
}

export default SearchRoomHouseKeeper;
