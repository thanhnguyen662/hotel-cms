import { InfoOutlineIcon } from '@chakra-ui/icons';
import {
   Avatar,
   Box,
   Button,
   Heading,
   HStack,
   Tag,
   Text,
   VStack,
} from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import orderApi from '../../../../api/orderApi';
import ManageTable from '../../../../components/ManageTable';
import priceFormat from '../../../../utils/PriceFormat';
import CheckoutToolbar from '../../components/CheckoutToolbar';

function CheckoutPage(props) {
   const [orders, setOrders] = useState([]);
   let [searchParams, setSearchParams] = useSearchParams();
   let roomNumber = searchParams.get('roomNumber');
   let orderType = searchParams.get('orderType');
   const location = useLocation();

   useEffect(() => {
      const getOrdersInDb = async () => {
         try {
            const response = await orderApi.getOrders({
               orderType,
               roomNumber,
            });
            setOrders(response);
         } catch (error) {
            console.log(error);
         }
      };
      getOrdersInDb();
   }, [roomNumber, orderType]);

   const data = useMemo(() => [...orders], [orders]);
   const columns = useMemo(
      () => [
         {
            Header: 'id',
            accessor: 'id',
         },
         {
            Header: 'Rooms',
            Cell: (record) => {
               const value = record.row.original.orderItems;
               const rooms = value.reduce((array, item) => {
                  array.push(item.room.number);
                  return array;
               }, []);
               return <Text>{String(rooms)}</Text>;
            },
         },
         {
            Header: 'Room Price',
            accessor: 'totalPrice',
            Cell: (record) => {
               return <Text>{priceFormat(record.value)}</Text>;
            },
         },
         {
            Header: 'Receptionist',
            accessor: 'user.username',
            Cell: (record) => {
               return (
                  <HStack spacing='10px'>
                     <Avatar name={record.value} />
                     <Text>{record.value}</Text>
                  </HStack>
               );
            },
         },
         {
            Header: 'Is Paid?',
            accessor: 'isComplete',
            Cell: (record) => {
               return (
                  <Text>
                     {record.value === true ? (
                        <Tag colorScheme={'green'} size='lg'>
                           YES
                        </Tag>
                     ) : (
                        <Tag colorScheme={'red'} size='lg'>
                           NO
                        </Tag>
                     )}
                  </Text>
               );
            },
         },
         {
            Header: 'Detail',
            Cell: (record) => {
               return (
                  <Link
                     to={`/checkout/${record.row.original.id}`}
                     state={{ backgroundLocation: location }}
                  >
                     <Button colorScheme={'green'}>
                        <InfoOutlineIcon />
                     </Button>
                  </Link>
               );
            },
         },
      ],

      [location],
   );

   const handleSearchRoom = (props) => {
      setSearchParams(props);
   };

   return (
      <>
         <Box bg='white' boxShadow='xl' rounded='xl' minH='82vh'>
            <VStack spacing='4' align='stretch' mx='7'>
               <Box pt='6'>
                  <Heading fontSize='25'>Manage Order</Heading>
                  <Text fontSize='sm'>
                     Nisi ullamco sint anim ipsum est incididunt.
                  </Text>
               </Box>
               <CheckoutToolbar handleSearchRoom={handleSearchRoom} />
               <ManageTable data={data} columns={columns} />
            </VStack>
         </Box>
      </>
   );
}

export default CheckoutPage;
