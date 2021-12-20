// import PropTypes from 'prop-types';
import {
   Button,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalFooter,
   ModalHeader,
   ModalOverlay,
} from '@chakra-ui/react';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

RoomCreateModal.propTypes = {};

function RoomCreateModal(props) {
   let location = useLocation();
   const navigate = useNavigate();

   return (
      <Modal
         isOpen={location.state?.backgroundLocation ? true : false}
         onClose={() => navigate(-1)}
      >
         <ModalOverlay />
         <ModalContent>
            <ModalHeader>Create Room</ModalHeader>
            <ModalCloseButton />
            <ModalBody>123123123</ModalBody>

            <ModalFooter>
               <Button colorScheme='blue' mr={3} onClick={() => navigate(-1)}>
                  Close
               </Button>
               <Button variant='ghost'>Secondary Action</Button>
            </ModalFooter>
         </ModalContent>
      </Modal>
   );
}

export default RoomCreateModal;
