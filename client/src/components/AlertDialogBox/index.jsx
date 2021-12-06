import {
   AlertDialog,
   AlertDialogBody,
   AlertDialogContent,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogOverlay,
   Button,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';

AlertDialogBox.propTypes = {
   isDeleteAlertOpen: PropTypes.bool,
   setIsDeleteAlertOpen: PropTypes.func,
   handleOnDelete: PropTypes.func,
};

AlertDialogBox.defaultProps = {
   isDeleteAlertOpen: false,
   setIsDeleteAlertOpen: null,
   handleOnDelete: null,
};

function AlertDialogBox(props) {
   const { isDeleteAlertOpen, setIsDeleteAlertOpen, handleOnDelete } = props;
   const onClose = () => setIsDeleteAlertOpen(false);
   const cancelRef = useRef();

   const onClickDelete = () => {
      handleOnDelete();
      onClose();
   };

   return (
      <>
         <AlertDialog
            isOpen={isDeleteAlertOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
         >
            <AlertDialogOverlay>
               <AlertDialogContent>
                  <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                     Delete Customer
                  </AlertDialogHeader>

                  <AlertDialogBody>
                     Are you sure? You can't undo this action afterwards.
                  </AlertDialogBody>

                  <AlertDialogFooter>
                     <Button ref={cancelRef} onClick={onClose}>
                        Cancel
                     </Button>
                     <Button colorScheme='red' onClick={onClickDelete} ml={3}>
                        Delete
                     </Button>
                  </AlertDialogFooter>
               </AlertDialogContent>
            </AlertDialogOverlay>
         </AlertDialog>
      </>
   );
}

export default AlertDialogBox;
