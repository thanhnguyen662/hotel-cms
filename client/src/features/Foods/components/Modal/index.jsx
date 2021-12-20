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
import AddFoods from '../AddFoods';
import EditFood from '../EditFood';

index.propTypes = {
   isOpen: PropTypes.bool,
   modalData: PropTypes.object,
   onClose: PropTypes.func,
   handleAdd: PropTypes.func,
   handleEdit: PropTypes.func,
};

function index(props) {
   //PROPS
   const { isOpen, modalData, onClose, handleAdd, handleEdit } = props;

   return (
      <>
         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>{modalData.title}</ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  {modalData.modalType === 'Add' ? (
                     <AddFoods onClose={onClose} handleAdd={handleAdd} />
                  ) : (
                     <EditFood
                        onClose={onClose}
                        modalData={modalData}
                        handleEdit={handleEdit}
                     />
                  )}
               </ModalBody>
            </ModalContent>
         </Modal>
      </>
   );
}

export default index;
