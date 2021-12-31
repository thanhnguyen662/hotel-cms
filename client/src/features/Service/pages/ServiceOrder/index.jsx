import { SearchIcon } from '@chakra-ui/icons';
import {
   Box,
   Button,
   Heading,
   Input,
   InputGroup,
   InputLeftElement,
   Stack,
   Text,
} from '@chakra-ui/react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import orderApi from '../../../../api/orderApi';
import ManageTable from '../../../../components/ManageTable';
import priceFormat from '../../../../utils/PriceFormat';

ServiceOrder.propTypes = {};

function ServiceOrder(props) {
   //STATE
   const [searchData, setSearchData] = useState({ search: '' });
   const [allOrder, setAllOrder] = useState([]);
   //NAVIGATE
   const navigate = useNavigate();
   //EFFECT
   useEffect(() => {
      const getAllOrder = async () => {
         const getOrder = await orderApi.getAllUnpaidOrderItem(searchData);
         console.log(getOrder);
         setAllOrder((pre) => {
            return getOrder?.reduce((array, item) => {
               const amount = item.serviceHistories?.reduce((num, i) => {
                  return (num += i.service.price * i.tickets);
               }, 0);

               const newData = {
                  roomNumber: item.room.number,
                  guestNumber: item._count.customerOrderItemRooms,
                  serviceNumber: item._count.serviceHistories,
                  amount: priceFormat(amount),
                  id: item.id,
               };
               return [...array, newData];
            }, []);
         });
      };
      getAllOrder();
   }, [searchData]);
   //REF
   const timeout = useRef(null);
   //TABLE var
   const data = useMemo(() => [...allOrder], [allOrder]);
   const columns = useMemo(
      () => [
         {
            Header: 'Room number',
            accessor: 'roomNumber',
         },
         {
            Header: 'Guests number',
            accessor: 'guestNumber',
         },
         {
            Header: 'Service number booked',
            accessor: 'serviceNumber',
         },
         {
            Header: 'Estimated service amount',
            accessor: 'amount',
         },
         {
            Header: 'Detail',
            accessor: 'id',
            Cell: (record) => {
               return (
                  <Button
                     colorScheme='blue'
                     onClick={() => handleServiceDetail(record.value)}
                  >
                     Button
                  </Button>
               );
            },
         },
      ],
      // eslint-disable-next-line
      [],
   );
   //FUNCTION
   const handleOnSearchChange = (data) => {
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
         setSearchData({ search: data });
      }, 400);
   };

   const handleServiceDetail = (id) => {
      return navigate(`/service/order/${id}`);
   };
   return (
      <Stack direction={['column', 'row']} spacing='24px' minH='82vh'>
         <Box flex='1' bg='white' boxShadow='xl' rounded='lg' p='5'>
            <Heading fontSize='25' mb='2'>
               Order Services
            </Heading>
            <Text mb='6'>Manage all existing order in the hotel</Text>
            <InputGroup flex='2' mb='25px'>
               <InputLeftElement
                  pointerEvents='none'
                  children={<SearchIcon color='gray.300' />}
               />
               <Input
                  placeholder='Search by room number'
                  onChange={(e) => handleOnSearchChange(e.target.value)}
               />
            </InputGroup>
            <ManageTable data={data} columns={columns} />
         </Box>
      </Stack>
   );
}

export default ServiceOrder;
