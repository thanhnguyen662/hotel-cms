import { SimpleGrid, Button, Heading, Box, Text } from '@chakra-ui/react';
import React from 'react';
import Room from '../Room';
// import PropTypes from 'prop-types';

RoomDiagram.propTypes = {};

function RoomDiagram(props) {
   const roomNumber = [];
   return (
      <SimpleGrid columns={3} spacing={5}>
         <Room />
      </SimpleGrid>
   );
}

export default RoomDiagram;
