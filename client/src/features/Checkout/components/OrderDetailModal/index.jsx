// import PropTypes from 'prop-types';
import {
   Box,
   Button,
   Divider,
   HStack,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalFooter,
   ModalHeader,
   ModalOverlay,
   Spacer,
   Text,
   VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import orderApi from '../../../../api/orderApi';
import ManageTable from '../../../../components/ManageTable';
import priceFormat from '../../../../utils/PriceFormat';
import Flatpickr from 'react-flatpickr';
import moment from 'moment';

OrderDetailModal.propTypes = {};

function OrderDetailModal(props) {
   let location = useLocation();
   const navigate = useNavigate();
   const { orderId } = useParams();
   const [orderData, setOrderData] = useState([]);
   const [totalServicePrice, setTotalServicePrice] = useState(0);

   useEffect(() => {
      const getOrderInDb = async () => {
         try {
            const response = await orderApi.getOrderById({
               orderId: orderId,
            });
            console.log('response: ', response);
            setOrderData(response);

            /////////////
            setTotalServicePrice((pre) => {
               const calculator = response.orderItems?.reduce((total, item) => {
                  const servicePrice = item.serviceHistories?.reduce(
                     (num, i) => {
                        return (num += i.service.price * i.tickets);
                     },
                     0,
                  );

                  return (total += servicePrice);
               }, 0);

               return calculator;
            });
         } catch (error) {
            console.log(error);
         }
      };
      getOrderInDb();
   }, [orderId, location]);

   const onClickCheckoutButton = async () => {
      try {
         const updateRoomStatus = orderData.orderItems.reduce((array, item) => {
            array.push(item.roomId);
            return array;
         }, []);

         const response = await orderApi.checkout({
            orderId,
            totalServicePrice,
            totalRoomPrice: orderData.totalPrice,
            updateRoomStatus,
         });

         if (response.message === 'checkout_success') return navigate(-1);
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <Modal
         isOpen={location.state?.backgroundLocation ? true : false}
         onClose={() => navigate(-1)}
         scrollBehavior={'inside'}
         size='lg'
      >
         <ModalOverlay />
         <ModalContent>
            <ModalHeader>Order {orderData?.id} Detail</ModalHeader>
            <ModalCloseButton />
            <ModalBody
               css={{
                  '&::-webkit-scrollbar': {
                     width: '3px',
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
               {Object.keys(orderData).length !== 0 && (
                  <ModalMainContent
                     orderData={orderData}
                     totalServicePrice={totalServicePrice}
                  />
               )}
            </ModalBody>

            <ModalFooter>
               <Button
                  colorScheme='red'
                  w='full'
                  onClick={onClickCheckoutButton}
                  disabled={orderData.isComplete}
               >
                  Payment
               </Button>
            </ModalFooter>
         </ModalContent>
      </Modal>
   );
}

const ModalMainContent = (props) => {
   const { orderData, totalServicePrice } = props;

   const columns = useMemo(
      () => [
         {
            Header: 'Name',
            Cell: (record) => {
               let value = record.row.original;
               return (
                  <Text>{`${value.customer.firstName} ${value.customer.lastName}`}</Text>
               );
            },
         },
         {
            Header: 'ID Card',
            Cell: (record) => {
               let value = record.row.original;
               return <Text>{value.customer.idCard}</Text>;
            },
         },
      ],
      [],
   );

   const serviceColumns = useMemo(
      () => [
         {
            Header: 'Service',
            accessor: 'service.name',
         },
         {
            Header: 'Tickets',
            accessor: 'tickets',
         },
         {
            Header: 'Price',
            accessor: 'service.price',
            Cell: (record) => {
               return <Text>{priceFormat(record.value)}</Text>;
            },
         },
         {
            Header: 'Served',
            accessor: 'servedAt',
            width: 500,
            Cell: (record) => {
               return <Text>{moment(record.value).format('YYYY-MM-DD')}</Text>;
            },
         },
      ],
      [],
   );

   const calculatorAmount = (serviceList) => {
      const amount = serviceList?.reduce((num, i) => {
         return (num += i.service.price * i.tickets);
      }, 0);

      return amount;
   };

   return (
      <VStack spacing='3'>
         <Box w='full' borderWidth='1px' rounded='lg'>
            <Flatpickr
               id='startDate'
               disabled={true}
               style={{
                  height: '100%',
                  borderRadius: '8px',
                  padding: '9.5px 10px',
                  width: '100%',
                  background: 'transparent',
               }}
               options={{
                  enableTime: true,
                  mode: 'range',
                  defaultDate: [
                     moment(orderData.startDate).toDate(),
                     moment(orderData.endDate).toDate(),
                  ],
               }}
            />
         </Box>
         <Box w='full'>
            <VStack spacing='2' w='full'>
               {orderData.orderItems.map((i) => (
                  <Box key={i.id} w='full'>
                     <Divider mt='1' />
                     <Text fontWeight='bold' m='2' mt='3' fontSize='lg'>
                        Room {i.room.number}
                     </Text>
                     <HStack m='2' spacing='5px' fontSize='sm'>
                        <Text>{priceFormat(i.room.roomDetail.price)}/ day</Text>
                        <Spacer />
                        <Text color='red.500'>
                           Room Total: {priceFormat(i.price)}
                        </Text>
                     </HStack>

                     <Box borderWidth='1px' rounded='lg'>
                        <ManageTable
                           data={i.customerOrderItemRooms}
                           columns={columns}
                        />
                     </Box>

                     <HStack m='2' mb='0' spacing='5px' fontSize='sm'>
                        <Spacer />
                        <Text color='red.500'>
                           Service Total:{' '}
                           {priceFormat(calculatorAmount(i.serviceHistories))}
                        </Text>
                     </HStack>

                     <Box borderWidth='1px' rounded='lg' mt='2'>
                        <ManageTable
                           data={i.serviceHistories}
                           columns={serviceColumns}
                        />
                     </Box>
                  </Box>
               ))}
            </VStack>
            <Divider mt='5' mb='4' />
            <HStack>
               <Box>
                  During:{' '}
                  {moment(orderData.endDate).diff(
                     moment(orderData.startDate),
                     'hours',
                  )}{' '}
                  hours
               </Box>
               <Spacer />
               <Box fontWeight='bold' fontSize='lg' color='red.500'>
                  Total Price:{' '}
                  {priceFormat(orderData.totalPrice + totalServicePrice)}
               </Box>
            </HStack>
         </Box>
      </VStack>
   );
};

export default OrderDetailModal;
