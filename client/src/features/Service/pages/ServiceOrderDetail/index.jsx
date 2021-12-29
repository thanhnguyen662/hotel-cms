import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
   Box,
   Heading,
   InputGroup,
   InputLeftElement,
   Stack,
   Text,
   SimpleGrid,
   VStack,
   Button,
   useDisclosure,
} from '@chakra-ui/react';
import ServiceCard from '../../components/ServiceCard';
import priceFormat from '../../../../utils/PriceFormat';
import { useParams } from 'react-router-dom';
import ServiceModal from '../../components/Modal';

ServiceOrderDetail.propTypes = {};

function ServiceOrderDetail(props) {
   const { orderId } = useParams();
   //UI hook
   const { isOpen, onOpen, onClose } = useDisclosure();
   //STATE
   const [modalData, setModalData] = useState({});

   return (
      <Stack direction={['column', 'row']} spacing='24px' minH='82vh'>
         <Box flex='2' bg='white' boxShadow='xl' rounded='lg' p='5'>
            <Heading pl='13px' pt='13px' fontSize='25' mb='2'>
               Services list
            </Heading>
            <Text pl='13px' mb='6'>
               Manage all existing service ordered for user1
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
                  <Box>
                     <ServiceCard />
                  </Box>
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
                     <Box>Info</Box>
                     <Box w='80%'>
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
                     {priceFormat('10000')}
                  </Text>
               </Box>
            </VStack>
         </Box>
         <ServiceModal
            isOpen={isOpen}
            modalData={modalData}
            onClose={onClose}
            orderId={orderId}
         />
      </Stack>
   );
}

export default ServiceOrderDetail;
