import {
   AlertDialog,
   AlertDialogBody,
   AlertDialogContent,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogOverlay,
   Button,
} from '@chakra-ui/react';
// import PropTypes from 'prop-types';
import React, { useRef } from 'react';

AlertDialogBox.propTypes = {};

function AlertDialogBox(props) {
   const { isDeleteAlertOpen, setIsDeleteAlertOpen, handleOnDelete } = props;

   const cancelRef = useRef();

   const onClickDelete = async () => {
      handleOnDelete();
   };

   return (
      <>
         <AlertDialog
            isOpen={isDeleteAlertOpen}
            leastDestructiveRef={cancelRef}
            onClose={() => setIsDeleteAlertOpen(false)}
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
                     <Button
                        ref={cancelRef}
                        onClick={() => setIsDeleteAlertOpen(false)}
                     >
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
