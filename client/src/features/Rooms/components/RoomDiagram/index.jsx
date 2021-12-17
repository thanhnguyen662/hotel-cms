import { SimpleGrid } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';
import Room from '../Room';

RoomDiagram.propTypes = {
   floor: PropTypes.number,
};

RoomDiagram.defaultProps = {
   floor: 0,
};

function RoomDiagram(props) {
   const { rooms } = props;

   const isRoomType = (room) => {
      if (room.roomDetail.type === 'single') return 'green';
      if (room.roomDetail.type === 'double') return 'blue';
      if (room.roomDetail.type === 'vip') return 'red';
   };

   return (
      <>
         <SimpleGrid columns={3} spacing={5}>
            {rooms?.map((room) => {
               const color = isRoomType(room);
               return (
                  <Room
                     roomNumber={room.number}
                     key={room.id}
                     color={color}
                     type={room.roomType}
                  />
               );
            })}
         </SimpleGrid>
      </>
   );
}

export default RoomDiagram;
