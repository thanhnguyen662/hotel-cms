import { Button, Heading } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

Room.propTypes = {
   roomNumber: PropTypes.number,
};

function Room(props) {
   const { roomNumber, color } = props;

   const navigate = useNavigate();

   const onClickRoom = (roomNumber) => {
      navigate(`${roomNumber}`);
   };

   return (
      <>
         <Button
            colorScheme={color}
            variant='outline'
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
