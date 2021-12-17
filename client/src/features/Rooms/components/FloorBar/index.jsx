import { ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons';
import { Button, HStack } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';

FloorBar.propTypes = {
   handleUpFloor: PropTypes.func,
   handleDownFloor: PropTypes.func,
   floor: PropTypes.number,
};

FloorBar.defaultProps = {
   handleUpFloor: null,
   handleDownFloor: null,
   floor: 1,
};

function FloorBar(props) {
   const { handleUpFloor, handleDownFloor, floor } = props;
   return (
      <HStack w='auto'>
         <Button
            colorScheme='blue'
            variant='solid'
            onClick={handleUpFloor}
            disabled={floor >= 8 ? true : false}
         >
            <ArrowUpIcon />
         </Button>
         <Button
            colorScheme='blue'
            variant='solid'
            onClick={handleDownFloor}
            disabled={floor <= 1 ? true : false}
         >
            <ArrowDownIcon />
         </Button>
      </HStack>
   );
}

export default FloorBar;
