import { StarIcon } from '@chakra-ui/icons';
import { Badge, Box, Image } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import priceFormat from '../../../../utils/PriceFormat';

RoomStatus.propTypes = {};

function RoomStatus(props) {
   const { selectedRoom } = props;
   // const [selectedRoom, setSelectedRoom] = useState({});
   const property = {
      imageUrl: 'https://bit.ly/2Z4KKcF',
      imageAlt: 'Rear view of modern home with pool',
      beds: 3,
      baths: 2,
      title: 'Modern home in city center in the heart of historic Los Angeles',
      formattedPrice: '$1,900.00',
      reviewCount: 34,
      rating: 4,
   };
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
      // <Box borderRadius='lg' overflow='hidden'>
      //    <Image src={property.imageUrl} alt={property.imageAlt} />

      //    <Box p='6'>
      //       <Box display='flex' alignItems='baseline'>
      //          <Badge borderRadius='full' px='2' colorScheme='teal'>
      //             New
      //          </Badge>
      //          <Box
      //             color='gray.500'
      //             fontWeight='semibold'
      //             letterSpacing='wide'
      //             fontSize='xs'
      //             textTransform='uppercase'
      //             ml='2'
      //          >
      //             {property.beds} beds &bull; {property.baths} baths
      //          </Box>
      //       </Box>

      //       <Box
      //          mt='1'
      //          fontWeight='semibold'
      //          as='h4'
      //          lineHeight='tight'
      //          isTruncated
      //       >
      //          Do tempor sunt sint
      //       </Box>

      //       <Box>
      //          {property.formattedPrice}
      //          <Box as='span' color='gray.600' fontSize='sm'>
      //             / wk
      //          </Box>
      //       </Box>
      //    </Box>
      // </Box>
   );
}

export default RoomStatus;
