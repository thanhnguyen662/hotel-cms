import {
   Box,
   chakra,
   Flex,
   Heading,
   HStack,
   IconButton,
   Text,
   useColorModeValue,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { BiEditAlt } from 'react-icons/bi';
import { FaRegCalendarCheck, FaRegCalendarTimes } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import eventApi from '../../../../api/eventApi';
import AlertDialogBox from '../../../../components/AlertDialogBox';

EventCard.propTypes = {
   data: PropTypes.object,
   deleteEventProp: PropTypes.object,
   editEventModalProp: PropTypes.object,
};

function EventCard(props) {
   //STATE
   const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
   //PROPS
   const { data, deleteEventProp, editEventModalProp } = props;

   //FUNCTION
   const deleteEvent = async () => {
      const deleteEventItem = await eventApi.deleteEvent(data);
      deleteEventProp(deleteEventItem);
   };

   const editEvent = async () => {
      editEventModalProp({
         ...data,
         title: 'Edit event',
         modalType: 'Edit',
      });
   };
   return (
      <>
         <Box
            borderWidth='0.5px'
            borderColor='gray.100'
            w='350px'
            px={8}
            py={4}
            rounded='lg'
            shadow='lg'
            bg={useColorModeValue('white', 'gray.800')}
         >
            <Flex justifyContent='space-between' alignItems='center'>
               <chakra.span
                  fontSize='sm'
                  color={useColorModeValue('gray.600', 'gray.400')}
               >
                  {new Date(data.createdAt).toLocaleString()}
               </chakra.span>
               <HStack spacing='4px'>
                  <IconButton
                     borderWidth='1px'
                     variant='outline'
                     colorScheme='gray'
                     aria-label='Edit'
                     icon={<BiEditAlt />}
                     size={'sm'}
                     onClick={editEvent}
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
               {/* <Link
                        px={3}
                        py={1}
                        bg='gray.600'
                        color='gray.100'
                        fontSize='sm'
                        fontWeight='700'
                        rounded='md'
                        _hover={{ bg: 'gray.500' }}
                     >
                        Design
                     </Link> */}
            </Flex>

            <Box mt={2}>
               <Heading
                  fontSize='2xl'
                  color={useColorModeValue('gray.700', 'white')}
                  fontWeight='700'
                  //  _hover={{
                  //     color: useColorModeValue('gray.600', 'gray.200'),
                  //     textDecor: 'underline',
                  //  }}
               >
                  {data.name}
               </Heading>
               <chakra.p
                  mt={2}
                  color={useColorModeValue('gray.600', 'gray.300')}
                  height='150px'
                  overflow='auto'
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
                  {data.detail}
               </chakra.p>
               <HStack spacing='10px'>
                  <FaRegCalendarCheck />
                  <Text>Start at: {new Date(data.start).toLocaleString()}</Text>
               </HStack>
               <HStack spacing='10px'>
                  <FaRegCalendarTimes />
                  <Text>Ends at: {new Date(data.end).toLocaleString()}</Text>
               </HStack>
            </Box>
            <Flex justifyContent='space-between' alignItems='center' mt={4}>
               {/* <Text
                        color={useColorModeValue('brand.600', 'brand.400')}
                        _hover={{ textDecor: 'underline' }}
                     >
                        Read more
                     </Text> */}

               {/* <Flex alignItems='center'>
                        <Image
                           mx={4}
                           w={10}
                           h={10}
                           rounded='full'
                           fit='cover'
                           display={{ base: 'none', sm: 'block' }}
                           src='https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=40&q=80'
                           alt='avatar'
                        />
                        <Link
                           color={useColorModeValue('gray.700', 'gray.200')}
                           fontWeight='700'
                           cursor='pointer'
                        >
                           Khatab wedaa
                        </Link>
                     </Flex> */}
            </Flex>
         </Box>
         <AlertDialogBox
            isDeleteAlertOpen={isDeleteAlertOpen}
            setIsDeleteAlertOpen={setIsDeleteAlertOpen}
            handleOnDelete={deleteEvent}
         />
      </>
   );
}

export default EventCard;
