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
   useToast,
   VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState, useRef } from 'react';
import eventApi from '../../../../api/eventApi';
import EventCard from '../../components/EventCard';
import EventModal from '../../components/EventModal';

ManageEvent.propTypes = {};

function ManageEvent(props) {
   //STATE
   const [modalData, setModalData] = useState({});
   const [eventData, setEventData] = useState([]);
   const [searchKeyword, setSearchKeyword] = useState({ search: '' });
   //Hook
   const { isOpen, onOpen, onClose } = useDisclosure();

   //Toast
   const toast = useToast();
   //EFFECT
   useEffect(() => {
      const getAll = async () => {
         const getAllEvent = await eventApi.getAllEvent(searchKeyword);
         setEventData(getAllEvent);
      };
      getAll();
   }, [searchKeyword]);

   //REF
   const timeout = useRef(null);

   //FUNCTION
   //toast
   const showToastNotification = (title, description, status) => {
      toast({
         title: title,
         description: description,
         status: status,
         duration: 2000,
         isClosable: true,
      });
   };
   //add event
   const addNewEvent = (data) => {
      setEventData([data, ...eventData]);
   };
   //delete event
   const deleteEventProp = (data) => {
      setEventData((pre) => {
         return pre.filter((item) => item.id !== data.id);
      });
      return showToastNotification('Successful', `Delete success`, 'success');
   };
   //edit event
   const editEventModalProp = (data) => {
      setModalData(data);
      onOpen();
   };
   const editEventProp = (data) => {
      setEventData((pre) => {
         return [data, ...pre.filter((item) => item.id !== data.id)];
      });
      return showToastNotification('Successful', `Edit success`, 'success');
   };
   //search
   const handleOnSearchChange = (searchData) => {
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
         setSearchKeyword({ search: searchData });
      }, 400);
   };

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
                        onChange={(e) => handleOnSearchChange(e.target.value)}
                     />
                  </InputGroup>
                  <Button
                     leftIcon={<AddIcon />}
                     colorScheme='green'
                     variant='solid'
                     px='20px'
                     onClick={() => {
                        setModalData({
                           title: 'Add new event',
                           modalType: 'Add',
                        });
                        onOpen();
                     }}
                  >
                     Add
                  </Button>
               </HStack>
            </VStack>
            <SimpleGrid columns={3} spacing={5}>
               {eventData?.map((item) => (
                  <EventCard
                     key={item.id}
                     data={item}
                     deleteEventProp={deleteEventProp}
                     editEventModalProp={editEventModalProp}
                  />
               ))}
            </SimpleGrid>
         </Box>
         <EventModal
            isOpen={isOpen}
            modalData={modalData}
            onClose={onClose}
            addNewEvent={addNewEvent}
            editEventProp={editEventProp}
            // handleAdd={handleAdd}
            // handleEdit={handleEdit}
         />
      </Stack>
   );
}

export default ManageEvent;
