import { Box, HStack, StackDivider } from '@chakra-ui/react';
import React from 'react';
// import PropTypes from 'prop-types';

RoomStatistics.propTypes = {};

function RoomStatistics(props) {
   return (
      <>
         <Box height='full' align={'center'} mx='6' my='10'>
            <HStack
               spacing={2}
               align='center'
               divider={<StackDivider borderColor='gray.200' />}
            >
               <Box flex='1' align='center'>
                  <Box fontSize='0.8em'>SINGLE</Box>
                  <Box fontSize='1.5em' fontWeight='bold'>
                     5/17
                  </Box>
               </Box>
               <Box flex='1' align='center'>
                  <Box fontSize='0.8em'>DOUBLE</Box>
                  <Box fontSize='1.5em' fontWeight='bold'>
                     5/17
                  </Box>
               </Box>
               <Box flex='1' align='center'>
                  <Box fontSize='0.8em'>VIP</Box>
                  <Box fontSize='1.5em' fontWeight='bold'>
                     5/17
                  </Box>
               </Box>
            </HStack>
         </Box>
      </>
   );
}

export default RoomStatistics;
