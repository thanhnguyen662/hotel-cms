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
import EditEvent from '../EditEvent';

EventModal.propTypes = {
   isOpen: PropTypes.bool,
   onClose: PropTypes.func,
   modalData: PropTypes.object,
   addNewEvent: PropTypes.func,
   editEventProp: PropTypes.func,
};

function EventModal(props) {
   //PROPS
   const { isOpen, onClose, modalData, addNewEvent, editEventProp } = props;

   return (
      <>
         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>{modalData.title}</ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  {modalData.modalType === 'Add' ? (
                     <AddEvent onClose={onClose} addNewEvent={addNewEvent} />
                  ) : (
                     <EditEvent
                        onClose={onClose}
                        editEventData={modalData}
                        editEventProp={editEventProp}
                     />
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
