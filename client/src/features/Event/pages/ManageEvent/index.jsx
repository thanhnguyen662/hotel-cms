import { Box, SimpleGrid, Stack } from '@chakra-ui/react';
import React from 'react';
import EventCard from '../../components/EventCard';

ManageEvent.propTypes = {};

function ManageEvent(props) {
   return (
      <Stack direction={['column', 'row']} spacing='24px' minH='82vh'>
         <Box flex='1' bg='white' boxShadow='xl' rounded='lg' p='5'>
            <SimpleGrid columns={3} spacing={7}>
               <EventCard />
            </SimpleGrid>
         </Box>
      </Stack>
   );
}

export default ManageEvent;
