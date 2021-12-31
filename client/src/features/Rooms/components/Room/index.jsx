import { SmallAddIcon } from '@chakra-ui/icons';
import { Button, Heading, VStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

Room.propTypes = {
   roomNumber: PropTypes.number,
};

function Room(props) {
   const {
      roomNumber,
      room,
      color,
      isDisabled,
      handleAddOrderRooms,
      isSelected,
   } = props;
   const navigate = useNavigate();

   const onClickRoom = (roomNumber) => {
      navigate(`/rooms/manage/${roomNumber}`);
   };

   const onClickAdd = (room) => {
      handleAddOrderRooms(room);
   };

   return (
      <VStack>
         <Button
            colorScheme={color}
            variant={'outline'}
            height='90px'
            w='full'
            onClick={() => onClickRoom(roomNumber)}
         >
            <Heading size='lg'>{roomNumber}</Heading>
         </Button>

         <Button
            height='38px'
            leftIcon={<SmallAddIcon />}
            variant={isSelected ? 'solid' : 'outline'}
            colorScheme={color}
            isDisabled={isDisabled}
            onClick={() => onClickAdd(room)}
            w='full'
         >
            Select
         </Button>
      </VStack>
   );
}

export default Room;
