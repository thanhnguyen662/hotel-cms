import { ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons';
import { Button, HStack } from '@chakra-ui/react';
import React from 'react';
// import PropTypes from 'prop-types';

FloorBar.propTypes = {};

function FloorBar(props) {
   return (
      <HStack w='auto'>
         <Button colorScheme='blue' variant='solid'>
            <ArrowUpIcon />
         </Button>
         <Button colorScheme='blue' variant='solid'>
            <ArrowDownIcon />
         </Button>
      </HStack>
   );
}

export default FloorBar;
