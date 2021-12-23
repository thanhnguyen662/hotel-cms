import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
// import PropTypes from 'prop-types';

RoomStatistics.propTypes = {};

function RoomStatistics(props) {
   return (
      <>
         <Flex justify='center' align='center' height='full' mx='10px'>
            <Box flex='1' align='center'>
               <Box fontSize='0.7em'>SINGLE</Box>
               <Box fontSize='1.2em' fontWeight='bold'>
                  5/17
               </Box>
            </Box>
            <Box flex='1' align='center'>
               <Box fontSize='0.7em'>DOUBLE</Box>
               <Box fontSize='1.2em' fontWeight='bold'>
                  5/17
               </Box>
            </Box>
            <Box flex='1' align='center'>
               <Box fontSize='0.7em'>VIP</Box>
               <Box fontSize='1.2em' fontWeight='bold'>
                  5/17
               </Box>
            </Box>
         </Flex>
      </>
   );
}

export default RoomStatistics;
