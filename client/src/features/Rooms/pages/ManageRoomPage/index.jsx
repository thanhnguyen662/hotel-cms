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
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import roomApi from '../../../../api/roomApi';
import FloorBar from '../../components/FloorBar';
import RoomDiagram from '../../components/RoomDiagram';
import RoomStatistics from '../../components/RoomStatistics';
import RoomStatus from '../../components/RoomStatus';
import RoomToolBar from '../../components/RoomToolBar';

function ManageRoomPage(props) {
   const [floor, setFloor] = useState(1);
   const [rooms, setRooms] = useState([]);
   const [selectedRoom, setSelectedRoom] = useState({});
   let [searchParams, setSearchParams] = useSearchParams();
   const [searchData, setSearchData] = useState({
      roomType: 'all',
   });

   let location = useLocation();
   let selectedRoomArr = searchParams.get('selectedRoomArr');
   let decodeURI = decodeURIComponent(selectedRoomArr);

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
   }, [floor, searchData, location]);

   useEffect(() => {
      const getRoomInDb = async () => {
         if (JSON.parse(decodeURI).length !== 1) return;
         try {
            const response = await roomApi.getRoomById({
               roomNumber: JSON.parse(decodeURI)[0] || 101,
            });
            setSelectedRoom(response);
            console.log('room by id: ', response);
         } catch (error) {
            console.log(error);
         }
      };
      getRoomInDb();
   }, [decodeURI]);

   const handleSetSearchParams = (arrayToURI) => {
      setSearchParams({ selectedRoomArr: arrayToURI });
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
                        <Button leftIcon={<AddIcon />} colorScheme={'green'}>
                           Add
                        </Button>
                     </Link>
                  </HStack>
                  <RoomDiagram
                     rooms={rooms}
                     handleSetSearchParams={handleSetSearchParams}
                  />
               </VStack>
            </Box>
         </Box>
         <Box flex='1'>
            <VStack spacing='24px' height='full'>
               <Box
                  bg='white'
                  boxShadow='xl'
                  rounded='lg'
                  width='full'
                  height='full'
               >
                  <RoomStatistics />
               </Box>
               <Box width='full'>
                  {JSON.parse(decodeURI).length === 1 ? (
                     <RoomStatus selectedRoom={selectedRoom} />
                  ) : (
                     <>
                        <Box>
                           <HStack>
                              {JSON.parse(decodeURI)?.map((i) => (
                                 <Text key={i}>{i}</Text>
                              ))}
                           </HStack>
                        </Box>
                     </>
                  )}
               </Box>
            </VStack>
         </Box>
      </Stack>
   );
}

export default ManageRoomPage;
