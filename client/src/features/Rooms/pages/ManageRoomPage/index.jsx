import { AddIcon } from '@chakra-ui/icons';
import {
   Box,
   Button,
   Heading,
   HStack,
   Spacer,
   Stack,
   Text,
   VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import roomApi from '../../../../api/roomApi';
import FloorBar from '../../components/FloorBar';
import RoomDiagram from '../../components/RoomDiagram';
import RoomStatistics from '../../components/RoomStatistics';
import RoomStatus from '../../components/RoomStatus';
import RoomTempPrice from '../../components/RoomTempPrice';
import RoomToolBar from '../../components/RoomToolBar';

function ManageRoomPage(props) {
   const { roomNumber } = useParams();
   const [floor, setFloor] = useState(1);
   const [rooms, setRooms] = useState([]);
   const [selectedRoom, setSelectedRoom] = useState({});
   const [addOrderRooms, setAddOrderRooms] = useState([]);

   const [searchData, setSearchData] = useState({
      roomType: 'all',
   });

   let location = useLocation();

   useEffect(() => {
      const getRoomsInDb = async () => {
         try {
            const response = await roomApi.getRooms({
               floor: floor,
               roomType: searchData.roomType,
            });
            // console.log('rooms: ', response);
            setRooms(response);
         } catch (error) {
            console.log(error);
         }
      };
      getRoomsInDb();
   }, [floor, searchData]);

   useEffect(() => {
      const getRoomInDb = async () => {
         if (roomNumber === undefined) return;
         try {
            const response = await roomApi.getRoomById({
               roomNumber: roomNumber || 101,
            });
            setSelectedRoom(response);
         } catch (error) {
            console.log(error);
         }
      };
      getRoomInDb();
   }, [roomNumber]);

   const handleAddOrderRooms = (selected) => {
      setAddOrderRooms((prev) => {
         if (prev.some((i) => i.number === selected.number)) {
            return prev.filter((i) => i.number !== selected.number);
         }
         return [...prev, selected];
      });
   };

   const handleUpFloor = () => {
      setFloor(floor + 1);
   };

   const handleDownFloor = () => {
      setFloor(floor - 1);
   };

   const handleChangeSearchValue = (key, value) => {
      setSearchData({ ...searchData, [key]: value });
   };

   return (
      <Stack direction={['column', 'row']} spacing='24px' minH='82vh'>
         <Box flex='2' bg='white' boxShadow='xl' rounded='lg'>
            <Box mx='7' my='6'>
               <VStack spacing='4' align='stretch'>
                  <HStack>
                     <Box>
                        <Heading fontSize='25'>Floor {floor}</Heading>
                        <Text fontSize='sm'>
                           Nisi ullamco sint anim ipsum est incididunt.
                        </Text>
                     </Box>
                     <Spacer />
                     <FloorBar
                        floor={floor}
                        handleUpFloor={handleUpFloor}
                        handleDownFloor={handleDownFloor}
                     />
                  </HStack>
                  <HStack>
                     <RoomToolBar
                        handleChangeSearchValue={handleChangeSearchValue}
                        searchData={searchData}
                     />
                     <Link
                        to={`/rooms/add`}
                        state={{ backgroundLocation: location }}
                     >
                        <Button leftIcon={<AddIcon />} variant={'outline'}>
                           Add
                        </Button>
                     </Link>
                  </HStack>
                  <RoomDiagram
                     rooms={rooms}
                     handleAddOrderRooms={handleAddOrderRooms}
                     addOrderRooms={addOrderRooms}
                  />
               </VStack>
            </Box>
         </Box>
         <Box flex='1'>
            <VStack spacing='20px' height='full'>
               <Box
                  bg='white'
                  boxShadow='xl'
                  rounded='lg'
                  width='full'
                  height='full'
                  flex='1'
               >
                  <RoomStatistics />
               </Box>
               <Box width='full' flex='1'>
                  <RoomStatus selectedRoom={selectedRoom} />
               </Box>
               <Box
                  flex='3'
                  width='full'
                  // maxH='245px'
                  // bg='white'
                  // boxShadow='xl'
                  // rounded='lg'
                  // overflowY='auto'
                  // css={{
                  //    '&::-webkit-scrollbar': {
                  //       width: '4px',
                  //    },
                  //    '&::-webkit-scrollbar-track': {
                  //       width: '6px',
                  //    },
                  //    '&::-webkit-scrollbar-thumb': {
                  //       background: '#ADAFC6',
                  //       borderRadius: '24px',
                  //    },
                  // }}
               >
                  <RoomTempPrice addOrderRooms={addOrderRooms} />
               </Box>

               <Box w='full' boxShadow='xl'>
                  <Button
                     colorScheme='red'
                     w='full'
                     disabled={!addOrderRooms?.length > 0}
                  >
                     Order
                  </Button>
               </Box>
            </VStack>
         </Box>
      </Stack>
   );
}

export default ManageRoomPage;
