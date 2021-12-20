import { SimpleGrid } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Room from '../Room';

RoomDiagram.propTypes = {
   floor: PropTypes.number,
};

RoomDiagram.defaultProps = {
   floor: 0,
};

function RoomDiagram(props) {
   const { rooms, handleSetSearchParams } = props;
   const [selectedRoomsArray, setSelectedRoomArray] = useState([101]);

   const isRoomType = (room) => {
      if (room.roomDetail.type === 'single') return 'green';
      if (room.roomDetail.type === 'double') return 'blue';
      if (room.roomDetail.type === 'vip') return 'red';
   };

   useEffect(() => {
      const arrayToURI = encodeURIComponent(JSON.stringify(selectedRoomsArray));
      handleSetSearchParams(arrayToURI);
      // eslint-disable-next-line
   }, [selectedRoomsArray]);

   const handleSelectedRoomArray = (roomNumber) => {
      setSelectedRoomArray((prev) => {
         if (prev.some((i) => i === roomNumber)) {
            if (prev.length === 1 && prev[0] === roomNumber) {
               return prev;
            } else {
               return prev.filter((i) => i !== roomNumber);
            }
         }
         return [...prev, roomNumber];
      });
   };

   return (
      <>
         <SimpleGrid columns={3} spacing={5}>
            {rooms?.map((room) => {
               const color = isRoomType(room);
               const onRoomSelect = selectedRoomsArray.includes(room.number);

               return (
                  <Room
                     roomNumber={room.number}
                     key={room.id}
                     color={color}
                     type={room.roomType}
                     handleSelectedRoomArray={handleSelectedRoomArray}
                     onRoomSelect={onRoomSelect}
                  />
               );
            })}
         </SimpleGrid>
      </>
   );
}

export default RoomDiagram;
