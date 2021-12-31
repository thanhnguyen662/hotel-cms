import {
   Box,
   Button,
   Heading,
   HStack,
   SimpleGrid,
   Stack,
   Text,
   useDisclosure,
   useToast,
   VStack,
} from '@chakra-ui/react';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import orderApi from '../../../../api/orderApi';
import priceFormat from '../../../../utils/PriceFormat';
import ServiceCard from '../../components/ServiceCard';
import ServiceModal from '../../components/ServiceModal';

ServiceOrderDetail.propTypes = {};

function ServiceOrderDetail(props) {
   const { orderId } = useParams();
   //UI hook
   const { isOpen, onOpen, onClose } = useDisclosure();
   const toast = useToast();
   //STATE
   const [modalData, setModalData] = useState({});
   const [serviceCardList, setServiceCardList] = useState([]);
   const [serviceCost, setServiceCost] = useState(0);
   const [statisticOrder, setStatisticOrder] = useState({});
   //EFFECT
   useEffect(() => {
      const OrderDetail = async () => {
         const getOrderDetail = await orderApi.getOrderItem({ id: orderId });
         console.log('cc., ', getOrderDetail);
         setServiceCardList(getOrderDetail.serviceHistories);
         console.log(getOrderDetail);
         setStatisticOrder({ roomNumber: getOrderDetail.room.number });
      };
      OrderDetail();
   }, [orderId]);

   useEffect(() => {
      const amount = serviceCardList?.reduce((num, i) => {
         return (num += i.service.price * i.tickets);
      }, 0);
      setServiceCost(amount);
   }, [serviceCardList]);

   useEffect(() => {
      const serviceNumbers = serviceCardList?.length || 0;
      const expired = serviceCardList?.reduce((num, i) => {
         if (moment(i.servedAt).isAfter(moment())) {
            return (num += 1);
         }
         return num;
      }, 0);
      const pending = serviceNumbers - expired;
      setStatisticOrder((pre) => {
         return {
            ...pre,
            serviceNumber: serviceNumbers,
            expired: expired || 0,
            pending: pending || 0,
         };
      });
   }, [serviceCardList]);

   //FUNCTION
   const showToastNotification = (title, description, status) => {
      toast({
         title: title,
         description: description,
         status: status,
         duration: 2000,
         isClosable: true,
      });
   };
   //add new order service
   const handleOrderServiceProp = (data) => {
      setServiceCardList([data, ...serviceCardList]);
      return showToastNotification(
         'Successful',
         `Oder service success`,
         'success',
      );
   };
   //handle edit order service
   const handleEditOrderServiceProps = (data) => {
      setServiceCardList((pre) => {
         const arr = pre.filter((item) => item.id !== data.id);
         return [data, ...arr];
      });
      return showToastNotification(
         'Successful',
         `Edit order service success`,
         'success',
      );
   };

   const handleDeleteOrderServiceProp = (data) => {
      setServiceCardList((pre) => {
         return pre.filter((item) => item.id !== data.id);
      });
      return showToastNotification(
         'Successful',
         `Delete order service success`,
         'success',
      );
   };

   return (
      <Stack direction={['column', 'row']} spacing='24px' minH='82vh'>
         <Box flex='2' bg='white' boxShadow='xl' rounded='lg' p='5'>
            <Heading pl='13px' pt='13px' fontSize='25' mb='2'>
               Services list
            </Heading>
            <Text pl='13px' mb='6'>
               Manage all existing service ordered for room{' '}
               {statisticOrder.roomNumber}
            </Text>
            <Box
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
               <SimpleGrid columns={3} spacing={10} px='15px'>
                  {serviceCardList?.map((item) => (
                     <Box key={item.id}>
                        <ServiceCard
                           serviceCardData={item}
                           handleDeleteOrderServiceProp={
                              handleDeleteOrderServiceProp
                           }
                           handleEditOrderServiceProps={
                              handleEditOrderServiceProps
                           }
                        />
                     </Box>
                  ))}
               </SimpleGrid>
            </Box>
         </Box>
         <Box flex='1' h='630px' position='sticky' top='24px' left='0'>
            <VStack spacing='24px' justify='space-between' h='full'>
               <Box
                  flex='5'
                  bg='white'
                  boxShadow='xl'
                  w='full'
                  rounded='lg'
                  p='5'
               >
                  <VStack h='full' w='full' justify='space-between'>
                     <Box w='full'>
                        <Heading
                           fontSize='50px'
                           color='gray'
                           w='full'
                           align='center'
                        >
                           Room {statisticOrder.roomNumber}{' '}
                        </Heading>
                        <HStack w='full' mt='20px'>
                           <Text fontWeight='bold' fontSize='17px'>
                              Services Ordered:
                           </Text>
                           <Text fontSize='16px'>
                              {statisticOrder.serviceNumber}{' '}
                              {statisticOrder.serviceNumber > 1
                                 ? 'services'
                                 : 'service'}
                           </Text>
                        </HStack>
                        <HStack w='full' mt='10px'>
                           <Text fontWeight='bold' fontSize='17px'>
                              Expired:
                           </Text>
                           <Text fontSize='16px'>
                              {statisticOrder.expired}{' '}
                              {statisticOrder.expired > 1
                                 ? 'services'
                                 : 'service'}
                           </Text>
                        </HStack>
                        <HStack w='full' mt='10px'>
                           <Text fontWeight='bold' fontSize='17px'>
                              Pending:
                           </Text>
                           <Text fontSize='16px'>
                              {statisticOrder.pending}{' '}
                              {statisticOrder.pending > 1
                                 ? 'services'
                                 : 'service'}
                           </Text>
                        </HStack>
                     </Box>
                     <Box w='full'>
                        <Button
                           colorScheme='green'
                           variant='solid'
                           px='20px'
                           w='full'
                           size='lg'
                           onClick={() => {
                              onOpen();
                              setModalData({
                                 title: 'Order new service',
                                 modalType: 'Order',
                              });
                           }}
                        >
                           ORDER NEW SERVICE
                        </Button>
                     </Box>
                  </VStack>
               </Box>
               <Box
                  flex='1'
                  bg='white'
                  boxShadow='xl'
                  w='full'
                  rounded='lg'
                  p='5'
               >
                  <Text
                     w='full'
                     align='center'
                     fontSize='20px'
                     fontWeight='bold'
                     color='gray'
                  >
                     TOTAL SERVICE COST
                  </Text>

                  <Text
                     mt='10px'
                     w='full'
                     align='center'
                     fontSize='30px'
                     fontWeight='bold'
                     color='gray'
                  >
                     {priceFormat(serviceCost)}
                  </Text>
               </Box>
            </VStack>
         </Box>
         <ServiceModal
            isOpen={isOpen}
            modalData={modalData}
            onClose={onClose}
            orderId={orderId}
            handleOrderServiceProp={handleOrderServiceProp}
         />
      </Stack>
   );
}

export default ServiceOrderDetail;
