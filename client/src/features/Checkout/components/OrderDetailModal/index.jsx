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

   useEffect(() => {
      const getOrderInDb = async () => {
         try {
            const response = await orderApi.getOrderById({
               orderId: orderId,
            });
            setOrderData(response);
         } catch (error) {
            console.log(error);
         }
      };
      getOrderInDb();
   }, [orderId]);

   return (
      <Modal
         isOpen={location.state?.backgroundLocation ? true : false}
         onClose={() => navigate(-1)}
      >
         <ModalOverlay />
         <ModalContent>
            <ModalHeader>Order {orderData?.id} Detail</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
               {Object.keys(orderData).length !== 0 && (
                  <ModalMainContent orderData={orderData} />
               )}
            </ModalBody>

            <ModalFooter>
               <Button colorScheme='red' w='full'>
                  Payment
               </Button>
            </ModalFooter>
         </ModalContent>
      </Modal>
   );
}

const ModalMainContent = (props) => {
   const { orderData } = props;

   const columns = useMemo(
      () => [
         {
            Header: 'id',
            accessor: 'id',
         },
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
                     moment(orderData.endDate).add(1, 'hours').toDate(),
                  ],
               }}
            />
         </Box>
         <Box w='full'>
            <VStack spacing='2' w='full'>
               {orderData.orderItems.map((i) => (
                  <Box key={i.id} w='full'>
                     <HStack m='2' spacing='5px'>
                        <Text> {i.room.number}</Text>
                        <Text>
                           | {priceFormat(i.room.roomDetail.price)}/ day
                        </Text>
                        <Spacer />
                        <Text fontWeight='bold' color='red.500'>
                           {' '}
                           {priceFormat(i.price)}
                        </Text>
                     </HStack>

                     <Box borderWidth='1px' rounded='lg'>
                        <ManageTable
                           data={i.customerOrderItemRooms}
                           columns={columns}
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
               <Box fontWeight='bold' fontSize='17px' color='red.500'>
                  Total Price: {priceFormat(orderData.totalPrice)}
               </Box>
            </HStack>
         </Box>
      </VStack>
   );
};

export default OrderDetailModal;
