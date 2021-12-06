import {
   Box,
   VStack,
   Stack,
   Heading,
   Text,
   HStack,
   Spacer,
} from '@chakra-ui/react';
import React from 'react';
import FloorBar from '../../components/FloorBar';
import RoomDiagram from '../../components/RoomDiagram';
import RoomStatistics from '../../components/RoomStatistics';
import RoomStatus from '../../components/RoomStatus';

function ManageRoomPage(props) {
   return (
      <Stack direction={['column', 'row']} spacing='24px' minH='82vh'>
         <Box flex='2' bg='white' boxShadow='xl' rounded='lg'>
            <Box mx='7' my='6'>
               <HStack mb='3'>
                  <Box>
                     <Heading fontSize='25'>Floor 1</Heading>
                     <Text fontSize='sm'>
                        Nisi ullamco sint anim ipsum est incididunt.
                     </Text>
                  </Box>
                  <Spacer />
                  <FloorBar />
               </HStack>
               <RoomDiagram />
            </Box>
         </Box>
         <Box flex='1'>
            <VStack spacing='24px' minH='82vh'>
               <Box bg='white' w='100%' flex='1' boxShadow='xl' rounded='lg'>
                  <RoomStatus />
               </Box>
               <Box bg='white' w='100%' flex='1' boxShadow='xl' rounded='lg'>
                  <RoomStatistics />
               </Box>
            </VStack>
         </Box>
      </Stack>
   );
}

export default ManageRoomPage;
