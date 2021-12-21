import React from 'react';
import PropTypes from 'prop-types';
import {
   Modal,
   ModalOverlay,
   ModalBody,
   ModalContent,
   ModalHeader,
   ModalCloseButton,
} from '@chakra-ui/react';
import AddEvent from '../AddEvent';

EventModal.propTypes = {
   isOpen: PropTypes.bool,
   onClose: PropTypes.func,
   modalData: PropTypes.object,
};

function EventModal(props) {
   //PROPS
   const { isOpen, onClose, modalData } = props;

   return (
      <>
         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>{modalData.title}</ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  {modalData.modalType === 'Add' ? (
                     <AddEvent onClose={onClose} />
                  ) : (
                     ''
                  )}
                  {/* {modalData.modalType === 'Add' ? (
                     <AddFoods onClose={onClose} handleAdd={handleAdd} />
                  ) : (
                     <EditFood
                        onClose={onClose}
                        modalData={modalData}
                        handleEdit={handleEdit}
                     />
                  )} */}
               </ModalBody>
            </ModalContent>
         </Modal>
      </>
   );
}

export default EventModal;
