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
import AddService from '../AddService';
import EditService from '../EditService';
import OrderService from '../OrderService';
import EditOrderService from '../EditOrderService';

index.propTypes = {
   isOpen: PropTypes.bool,
   modalData: PropTypes.object,
   onClose: PropTypes.func,
   handleAdd: PropTypes.func,
   handleEdit: PropTypes.func,
   orderId: PropTypes.string,
};

function index(props) {
   //PROPS
   const { isOpen, modalData, onClose, handleAdd, handleEdit, orderId } = props;

   return (
      <>
         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>{modalData.title}</ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  {modalData.modalType === 'Add' && (
                     <AddService onClose={onClose} handleAdd={handleAdd} />
                  )}
                  {modalData.modalType === 'Edit' && (
                     <EditService
                        onClose={onClose}
                        modalData={modalData}
                        handleEdit={handleEdit}
                     />
                  )}
                  {modalData.modalType === 'Order' && (
                     <OrderService
                        onClose={onClose}
                        modalData={modalData}
                        orderId={orderId}
                     />
                  )}
                  {modalData.modalType === 'EditOrder' && (
                     <EditOrderService
                        onClose={onClose}
                        modalData={modalData}
                     />
                  )}
               </ModalBody>
            </ModalContent>
         </Modal>
      </>
   );
}

export default index;
