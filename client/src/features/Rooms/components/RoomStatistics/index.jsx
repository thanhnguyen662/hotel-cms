import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
// import PropTypes from 'prop-types';

RoomStatistics.propTypes = {};

function RoomStatistics(props) {
   return (
      <>
         <Flex justify='center' align='center' height='full' mx='10px'>
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
         </Flex>
      </>
   );
}

export default RoomStatistics;
