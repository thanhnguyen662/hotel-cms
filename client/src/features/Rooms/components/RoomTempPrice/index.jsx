import { Box, HStack, Spacer, Text, VStack, Button } from '@chakra-ui/react';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ManageTable from '../../../../components/ManageTable';
import priceFormat from '../../../../utils/PriceFormat';

RoomTempPrice.propTypes = {
   addOrderRooms: PropTypes.array,
   rangeDate: PropTypes.array,
};

RoomTempPrice.defaultProps = {
   addOrderRooms: [],
   rangeDate: [],
};

RoomTempPrice.defaultProps = {};

function RoomTempPrice(props) {
   const { addOrderRooms, rangeDate } = props;
   const [totalPrice, setTotalPrice] = useState(0);
   const [duration, setDuration] = useState(0);

   const navigate = useNavigate();

   useEffect(() => {
      const startDate = moment(rangeDate[0]);
      const endDate = moment(rangeDate[1]);
      const durationHours = endDate.diff(startDate, 'hours');
      setDuration(durationHours);
   }, [rangeDate]);

   const data = useMemo(() => [...addOrderRooms], [addOrderRooms]);
   const columns = useMemo(
      () => [
         {
            Header: 'Room',
            accessor: 'number',
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
            Cell: (record) => {
               const pricePerHours = record.row.values['roomDetail.price'] / 24;
               const pricePerRow = pricePerHours * duration;
               return (
                  <>
                     <Box>{priceFormat(pricePerRow)}</Box>
                  </>
               );
            },
         },
      ],
      [duration],
   );

   useEffect(() => {
      const calculator = data?.reduce((total, row) => {
         const pricePerHours = row.roomDetail.price / 24;
         const pricePerRow = pricePerHours * duration;
         return (total += pricePerRow);
      }, 0);
      setTotalPrice(calculator);
   }, [data, duration]);

   return (
      <>
         <VStack
            spacing='0'
            boxShadow='xl'
            bg='white'
            borderBottomRadius={'lg'}
         >
            <Box
               width='full'
               maxH='230px'
               minH='230px'
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
               px='25px'
               py='6px'
               borderBottomRadius={'lg'}
            >
               <HStack>
                  <Text fontWeight='bold'>{duration} hours</Text>
                  <Spacer />
                  <Text fontWeight='bold'>
                     Total Price: {priceFormat(totalPrice)}
                  </Text>
               </HStack>
            </Box>
         </VStack>
         <Box w='full' boxShadow='xl' mt='4'>
            <Button
               colorScheme='red'
               w='full'
               disabled={!addOrderRooms?.length > 0}
               onClick={() =>
                  navigate('/orders/order', {
                     state: { totalPrice, duration, data, rangeDate },
                  })
               }
            >
               Order
            </Button>
         </Box>
      </>
   );
}

export default RoomTempPrice;
