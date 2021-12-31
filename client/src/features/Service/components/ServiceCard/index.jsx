import {
   Box,
   HStack,
   IconButton,
   Image,
   Text,
   useDisclosure,
   VStack,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { BiEditAlt } from 'react-icons/bi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import serviceApi from '../../../../api/serviceApi';
import AlertDialogBox from '../../../../components/AlertDialogBox';
import ServiceModal from '../ServiceModal';
ServiceCard.propTypes = {
   serviceCardData: PropTypes.object,
   handleDeleteOrderServiceProp: PropTypes.func,
   handleEditOrderServiceProps: PropTypes.func,
};

function ServiceCard(props) {
   //STATE
   const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
   // const [orderServiceId, setOrderServiceId] = useState({ oderServiceId: 2 });
   const [modalData, setModalData] = useState({});
   const {
      serviceCardData,
      handleDeleteOrderServiceProp,
      handleEditOrderServiceProps,
   } = props;
   //UI hook
   const { isOpen, onOpen, onClose } = useDisclosure();
   //CSS variable
   const cardColor = '#6F71AD';
   //Function
   const handleDelete = async () => {
      const handleDeleteRes = await serviceApi.deleteOrderService({
         orderId: serviceCardData.id,
      });

      handleDeleteOrderServiceProp(handleDeleteRes);
      setIsDeleteAlertOpen(false);
   };
   return (
      <Box
         w='full'
         p={'10px'}
         bg={cardColor}
         borderRadius='md'
         boxShadow='xl'
         position='relative'
         // _hover={{
         //    ServiceCardButton: { zIndex: 3 },
         // }}
      >
         <VStack>
            <Image
               borderRadius='md'
               w='full'
               h='150px'
               objectFit='cover'
               src={serviceCardData.service.image}
               alt='Service'
            />
            <Text w='full' isTruncated>
               {serviceCardData.service.name}
            </Text>
            <Text w='full' isTruncated>
               Serve for: {serviceCardData.tickets}
            </Text>
            <Text w='full' isTruncated>
               At: {new Date(serviceCardData.servedAt).toLocaleString()}
            </Text>
         </VStack>
         <VStack>
            <HStack
               spacing='4px'
               // as='ServiceCardButton'
               position='absolute'
               top='0'
               left='127.5px'
               // zIndex='-1'
               p='10px'
            >
               <IconButton
                  borderWidth='1px'
                  variant='outline'
                  colorScheme='gray'
                  aria-label='Edit'
                  icon={<BiEditAlt />}
                  size={'sm'}
                  onClick={() => {
                     onOpen();
                     setModalData({
                        title: `Edit service order`,
                        modalType: 'EditOrder',
                     });
                  }}
               />
               <IconButton
                  borderWidth='1px'
                  variant='outline'
                  colorScheme='gray'
                  aria-label='Delete'
                  icon={<RiDeleteBin5Line />}
                  size={'sm'}
                  onClick={() => setIsDeleteAlertOpen(true)}
               />
            </HStack>
         </VStack>
         <ServiceModal
            isOpen={isOpen}
            modalData={modalData}
            onClose={onClose}
            serviceCardData={serviceCardData}
            handleEditOrderServiceProps={handleEditOrderServiceProps}
         />
         <AlertDialogBox
            isDeleteAlertOpen={isDeleteAlertOpen}
            setIsDeleteAlertOpen={setIsDeleteAlertOpen}
            handleOnDelete={handleDelete}
         />
      </Box>
   );
}

export default ServiceCard;
