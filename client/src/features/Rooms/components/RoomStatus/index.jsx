import { Badge, Box, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import priceFormat from '../../../../utils/PriceFormat';

RoomStatus.propTypes = {};

function RoomStatus(props) {
   const { selectedRoom } = props;

   const [roomIsReady, setRoomIsReady] = useState('');

   useEffect(() => {
      const roomIsOk = () => {
         const roomStatus = selectedRoom?.statusOfRooms;
         const statusList = roomStatus?.reduce((array, item) => {
            array.push(item.roomStatus.note);
            return array;
         }, []);

         return statusList?.includes('not_ok')
            ? setRoomIsReady('UNREADY')
            : setRoomIsReady('READY');
      };
      roomIsOk();
   }, [selectedRoom]);

   return (
      <VStack spacing='3'>
         <Box
            borderRadius='lg'
            overflow='hidden'
            bg='white'
            boxShadow='xl'
            rounded='lg'
            w='100%'
         >
            {/* <Image
               src={selectedRoom?.roomDetail?.img[0]}
               style={{ width: '100%', height: '100px', objectFit: 'cover' }}
            /> */}

            <Box p='4'>
               <Box display='flex' alignItems='baseline'>
                  <Badge
                     borderRadius='full'
                     px='2'
                     colorScheme={roomIsReady === 'READY' ? 'green' : 'red'}
                  >
                     {roomIsReady}
                  </Badge>
                  <Box
                     color='gray.500'
                     fontWeight='semibold'
                     letterSpacing='wide'
                     fontSize='xs'
                     textTransform='uppercase'
                     ml='2'
                  >
                     {selectedRoom.roomDetail?.bedroom} beds
                  </Box>
               </Box>
               <Box ml='1' mt='2'>
                  <Box
                     as='h4'
                     fontWeight='semibold'
                     textTransform='capitalize'
                     isTruncated
                     maxW={'220px'}
                  >
                     {selectedRoom?.name}
                  </Box>
                  <Box color='gray.600' mt='1'>
                     {priceFormat(selectedRoom.roomDetail?.price)}
                     <Box as='span' color='gray.600' fontSize='sm'>
                        / day
                     </Box>
                  </Box>
               </Box>
            </Box>
         </Box>

         {/* <Box w='full'>
            <Button
               w='full'
               colorScheme='red'
               h='50px'
               boxShadow='xl'
               disabled={roomIsReady === 'READY' ? false : true}
            >
               Order Now
            </Button>
         </Box> */}
      </VStack>
   );
}

export default RoomStatus;
