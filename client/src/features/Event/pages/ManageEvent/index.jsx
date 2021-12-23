import { AddIcon, SearchIcon } from '@chakra-ui/icons';
import {
   Box,
   Button,
   Heading,
   HStack,
   Input,
   InputGroup,
   InputLeftElement,
   SimpleGrid,
   Stack,
   Text,
   useDisclosure,
   VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import AlertDialogBox from '../../../../components/AlertDialogBox';
import EventCard from '../../components/EventCard';
import EventModal from '../../components/EventModal';

ManageEvent.propTypes = {};

function ManageEvent(props) {
   //STATE
   const [modalData, setModalData] = useState({});
   //Hook
   const { isOpen, onOpen, onClose } = useDisclosure();

   return (
      <Stack direction={['column', 'row']} spacing='24px' minH='82vh'>
         <Box flex='1' bg='white' boxShadow='xl' rounded='lg' p='5'>
            <Heading fontSize='25' mb='2'>
               Manage Event
            </Heading>
            <Text mb='6'>Manage all existing events in the hotel</Text>
            <VStack spacing='5'>
               <HStack spacing='5' width='full' mb='20px'>
                  <InputGroup flex='2'>
                     <InputLeftElement
                        pointerEvents='none'
                        children={<SearchIcon color='gray.300' />}
                     />
                     <Input
                        placeholder='Search by event name'
                        // onChange={(e) =>
                        //    handleOnSearchChange(e.target.value, 'name')
                        // }
                     />
                  </InputGroup>
                  <Button
                     leftIcon={<AddIcon />}
                     colorScheme='green'
                     variant='solid'
                     px='20px'
                     onClick={() => {
                        onOpen();
                        setModalData({
                           title: 'Add new event',
                           modalType: 'Add',
                        });
                     }}
                  >
                     Add
                  </Button>
               </HStack>
            </VStack>
            <SimpleGrid columns={3} spacing={7}>
               <EventCard />
            </SimpleGrid>
         </Box>
         <EventModal
            isOpen={isOpen}
            modalData={modalData}
            onClose={onClose}
            // handleAdd={handleAdd}
            // handleEdit={handleEdit}
         />
         <AlertDialogBox
         // isDeleteAlertOpen={isDeleteAlertOpen}
         // setIsDeleteAlertOpen={setIsDeleteAlertOpen}
         // handleOnDelete={handleOnDelete}
         />
      </Stack>
   );
}

export default ManageEvent;
