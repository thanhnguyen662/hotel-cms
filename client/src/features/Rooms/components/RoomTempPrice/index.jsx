import { Box, Text, VStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import ManageTable from '../../../../components/ManageTable';
import priceFormat from '../../../../utils/PriceFormat';

RoomTempPrice.propTypes = {
   decodeURI: PropTypes.array,
};

RoomTempPrice.defaultProps = {
   decodeURI: [],
};

function RoomTempPrice(props) {
   const { addOrderRooms } = props;
   console.log('addOrderRooms: ', addOrderRooms);

   const data = useMemo(() => [...addOrderRooms], [addOrderRooms]);
   const columns = useMemo(
      () => [
         {
            Header: 'Room',
            accessor: 'number',
            Footer: (
               <span>
                  {
                     // Get the total of the price
                     data.reduce((total, item) => (total += item.number), 0)
                  }
               </span>
            ),
         },
         {
            Header: 'Price',
            accessor: 'roomDetail.price',
            Cell: (record) => {
               return (
                  <Box>
                     {priceFormat(record.row.values['roomDetail.price'])}
                     <Box as='span' color='gray.600' fontSize='sm'>
                        / day
                     </Box>
                  </Box>
               );
            },
         },
         {
            Header: 'Total',
            // accessor: 'price',
         },
      ],
      [data],
   );

   return (
      <VStack spacing='0' boxShadow='xl' rounded='lg' bg='white'>
         <Box
            width='full'
            maxH='200px'
            minH='200px'
            flex='3'
            overflowY='auto'
            css={{
               '&::-webkit-scrollbar': {
                  width: '2px',
               },
               '&::-webkit-scrollbar-track': {
                  width: '6px',
               },
               '&::-webkit-scrollbar-thumb': {
                  background: '#ADAFC6',
                  borderRadius: '24px',
               },
            }}
         >
            <ManageTable data={data} columns={columns} flex='3' />
         </Box>
         <Box
            flex='1'
            width='full'
            bg='gray.100'
            pr='40px'
            py='6px'
            align='end'
            borderBottomRadius={'lg'}
         >
            <Text fontWeight='bold'>Total Price: 0</Text>
         </Box>
      </VStack>
   );
}

export default RoomTempPrice;
