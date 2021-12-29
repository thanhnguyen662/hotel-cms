import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { Box, Button, HStack, Spacer, Stack, Text } from '@chakra-ui/react';
import moment from 'moment';
import React, { useMemo } from 'react';
import Flatpickr from 'react-flatpickr';
import ManageTable from '../../../../components/ManageTable';
import priceFormat from '../../../../utils/PriceFormat';

OrderPrice.propTypes = {};

function OrderPrice(props) {
   const {
      rangeOrderDate,
      defaultDate,
      defaultData,
      handleChangeOrderDate,
      orderDuration,
      totalOrderPrice,
      handleSelectAddCustomerRoom,
      customerOrderRoom,
      handleDeleteCustomerToRoom,
   } = props;

   const onClickAddCustomerRoom = (roomId) => {
      handleSelectAddCustomerRoom(roomId);
   };

   const onClickDeleteCustomerToRoom = (idCard) => {
      handleDeleteCustomerToRoom(idCard);
   };

   const data = useMemo(() => [...(defaultData || [])], [defaultData]);
   const columns = useMemo(
      () => [
         {
            Header: 'Room',
            accessor: 'number',
         },
         {
            Header: 'Price / day',
            accessor: 'roomDetail.price',
            Cell: (record) => {
               return (
                  <Box>
                     {priceFormat(record.row.values['roomDetail.price'])}
                  </Box>
               );
            },
         },
         {
            Header: 'Total',
            Cell: (record) => {
               const pricePerHours = record.row.values['roomDetail.price'] / 24;
               const pricePerRow = pricePerHours * orderDuration;
               return (
                  <>
                     <Box>{priceFormat(pricePerRow)}</Box>
                  </>
               );
            },
         },
         {
            Header: 'Action',
            // accessor: 'id',
            Cell: (record) => (
               <Button
                  size={'sm'}
                  colorScheme='blue'
                  onClick={() =>
                     onClickAddCustomerRoom(record.row.values.number)
                  }
               >
                  <AddIcon />
               </Button>
            ),
         },
      ],
      // eslint-disable-next-line
      [orderDuration],
   );

   const customerData = useMemo(
      () => [...(customerOrderRoom || [])],
      [customerOrderRoom],
   );
   const customerColumns = useMemo(
      () => [
         {
            Header: 'Room',
            accessor: 'roomId',
         },

         {
            Header: 'Last',
            accessor: 'lastName',
         },
         {
            Header: 'ID',
            accessor: 'idCard',
         },
         {
            Header: 'Action',
            Cell: (record) => (
               <Button
                  size={'sm'}
                  colorScheme='blue'
                  onClick={() =>
                     onClickDeleteCustomerToRoom(record.row.values.idCard)
                  }
               >
                  <DeleteIcon />
               </Button>
            ),
         },
      ],
      // eslint-disable-next-line
      [orderDuration],
   );

   return (
      <Stack direction={['row', 'column']} spacing='24px' h='full'>
         <Box bg='white' rounded='lg' boxShadow='xl' h='fit-content'>
            <Box pl='4' pt='3'>
               <Flatpickr
                  id='startDate'
                  value={rangeOrderDate}
                  onChange={handleChangeOrderDate}
                  style={{
                     height: '100%',
                     borderRadius: '8px',
                     padding: '9.5px 5px',
                     width: '100%',
                  }}
                  options={{
                     minDate: moment().subtract(30, 'minute').toDate(),
                     enableTime: true,
                     mode: 'range',
                     defaultDate: defaultDate,
                  }}
               />
            </Box>
            <Box
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
               maxH='170px'
               // minH='100px'
            >
               <ManageTable data={data} columns={columns} />
            </Box>
            <Box
               flex='1'
               width='full'
               bg='gray.100'
               pl='25px'
               pr='40px'
               py='15px'
               borderBottomRadius={'lg'}
            >
               <HStack>
                  <Text fontWeight='bold' fontSize='md'>
                     {orderDuration} hours
                  </Text>
                  <Spacer />
                  <Text fontWeight='bold' fontSize='lg' color='red.400'>
                     Total Price: {priceFormat(totalOrderPrice)}
                  </Text>
               </HStack>
            </Box>
         </Box>

         <Box
            bg='white'
            rounded='lg'
            boxShadow='xl'
            overflow='auto'
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
            maxH='290px'
         >
            <ManageTable data={customerData} columns={customerColumns} />
         </Box>
      </Stack>
   );
}

export default OrderPrice;
