import React from 'react';
import PropTypes from 'prop-types';
import {
   Box,
   Heading,
   Stack,
   Text,
   Flex,
   HStack,
   VStack,
   InputGroup,
   InputLeftElement,
   Input,
   Select,
   Button,
   useDisclosure,
   Image,
   Menu,
   MenuButton,
   MenuItem,
   MenuList,
   useToast,
} from '@chakra-ui/react';

FoodService.propTypes = {};

function FoodService(props) {
   return (
      <Stack direction={['column', 'row']} spacing='24px' minH='82vh'>
         <Box flex='1' bg='white' boxShadow='xl' rounded='lg' p='5'></Box>
      </Stack>
   );
}

export default FoodService;
