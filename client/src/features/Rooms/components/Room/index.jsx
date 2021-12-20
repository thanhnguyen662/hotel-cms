import { Button, Heading } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';

Room.propTypes = {
   roomNumber: PropTypes.number,
};

function Room(props) {
   const { roomNumber, color, handleSelectedRoomArray, onRoomSelect } = props;

   const onClickRoom = (roomNumber) => {
      handleSelectedRoomArray(roomNumber);
   };

   return (
      <>
         <Button
            colorScheme={color}
            variant={onRoomSelect ? 'solid' : 'outline'}
            height='130px'
            w='full'
            onClick={() => onClickRoom(roomNumber)}
         >
            <Heading size='lg'>{roomNumber}</Heading>
         </Button>
      </>
   );
}

export default Room;
