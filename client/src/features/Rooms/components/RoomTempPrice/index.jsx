import React from 'react';
import PropTypes from 'prop-types';
import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import priceFormat from '../../../../utils/PriceFormat';

RoomTempPrice.propTypes = {
   decodeURI: PropTypes.array,
};

RoomTempPrice.defaultProps = {
   decodeURI: [],
};

function RoomTempPrice(props) {
   const { selectedRoomDetail } = props;
   // console.log('selectedRoomDetail: ', selectedRoomDetail);

   return (
      <>
         <Box>
            <VStack>
               {selectedRoomDetail?.map((i) => {
                  return (
                     <HStack key={i.id}>
                        <Text>{i.number}</Text>
                        <Text>{priceFormat(i.roomDetail.price)}</Text>
                     </HStack>
                  );
               })}
            </VStack>
         </Box>
      </>
   );
}

export default RoomTempPrice;
