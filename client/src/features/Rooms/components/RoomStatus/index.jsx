import { Badge, Box, Image } from '@chakra-ui/react';
import React from 'react';
// import PropTypes from 'prop-types';
import priceFormat from '../../../../utils/PriceFormat';

RoomStatus.propTypes = {};

function RoomStatus(props) {
   const { selectedRoom } = props;
   // const [selectedRoom, setSelectedRoom] = useState({});

   return (
      <Box borderRadius='lg' overflow='hidden'>
         <Image src={selectedRoom?.roomDetail?.img[0]} />

         <Box p='5'>
            <Box display='flex' alignItems='baseline'>
               <Badge
                  borderRadius='full'
                  px='2'
                  colorScheme='teal'
                  fontSize='1em'
               >
                  Ready
               </Badge>
               <Box
                  color='gray.500'
                  fontWeight='semibold'
                  letterSpacing='wide'
                  fontSize='0.9em'
                  textTransform='uppercase'
                  ml='2'
               >
                  1 beds &bull; 2 baths
               </Box>
            </Box>
            <Box ml='1' mt='3'>
               <Box
                  as='h4'
                  fontWeight='semibold'
                  textTransform='capitalize'
                  isTruncated
                  fontSize='1.2em'
               >
                  {/* {selectedRoom?.roomDetail.type} */}
                  Laboris elit do occaecat laborum
               </Box>
               <Box fontSize='1.4em' color='gray.600'>
                  {priceFormat(selectedRoom.roomDetail?.price)}
                  <Box as='span' color='gray.600' fontSize='lg'>
                     / day
                  </Box>
               </Box>
            </Box>
         </Box>
      </Box>
   );
}

export default RoomStatus;
