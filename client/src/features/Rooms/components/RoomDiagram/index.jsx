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
   const { rooms, handleAddOrderRooms, addOrderRooms } = props;
   // console.log('addOrderRooms: ', addOrderRooms);

   const isRoomType = (room) => {
      if (room.roomDetail.type === 'single') return 'green';
      if (room.roomDetail.type === 'double') return 'blue';
      if (room.roomDetail.type === 'vip') return 'red';
   };

   const isAddOrderDisable = (selectedRoom) => {
      const roomStatus = selectedRoom?.statusOfRooms;
      const statusList = roomStatus?.reduce((array, item) => {
         array.push(item.roomStatus.note);
         return array;
      }, []);

      return statusList?.includes('not_ok') ? true : false;
   };

   const isAddOrderSelected = (room) => {
      return addOrderRooms?.some((i) => i.number === room.number);
   };

   return (
      <>
         <SimpleGrid columns={3} spacing={5}>
            {rooms?.map((room) => {
               const color = isRoomType(room);
               const isDisabled = isAddOrderDisable(room);
               const isSelected = isAddOrderSelected(room);

               return (
                  <Room
                     roomNumber={room.number}
                     key={room.id}
                     color={color}
                     type={room.roomType}
                     isDisabled={isDisabled}
                     isSelected={isSelected}
                     handleAddOrderRooms={handleAddOrderRooms}
                     room={room}
                  />
               );
            })}
         </SimpleGrid>
      </>
   );
}

export default RoomDiagram;
