import {
   AlertDialog,
   AlertDialogBody,
   AlertDialogContent,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogOverlay,
   Button,
   useToast,
} from '@chakra-ui/react';
// import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import userApi from '../../api/userApi';

AlertDialogBox.propTypes = {};

function AlertDialogBox(props) {
   const { userId } = useParams();
   const toast = useToast();
   const cancelRef = useRef();

   let location = useLocation();
   const navigate = useNavigate();

   const onClickDelete = async () => {
      try {
         const response = await userApi.delete({
            userId: userId,
         });
         if (response.message === 'delete_account_success') {
            showToastNotification(
               'Successful',
               `Delete account of ${response.username} success`,
               'success',
            );
            navigate(-1);
         }
      } catch (error) {
         console.log(error);
      }
   };

   const showToastNotification = (title, description, status) => {
      toast({
         title: title,
         description: description,
         status: status,
         duration: 9000,
         isClosable: true,
      });
   };

   return (
      <>
         <AlertDialog
            isOpen={location.state?.backgroundLocation ? true : false}
            leastDestructiveRef={cancelRef}
            onClose={() => navigate(-1)}
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
                     <Button ref={cancelRef} onClick={() => navigate(-1)}>
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
