import {
   Avatar,
   Button,
   Center,
   FormControl,
   FormErrorMessage,
   FormLabel,
   HStack,
   Input,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalHeader,
   ModalOverlay,
   Select,
   Stack,
   useColorModeValue,
   useToast,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import userApi from '../../../../api/userApi';

const EditForm = (props) => {
   const { onFormSubmit, editData, onClose, onClickResetPassword } = props;

   const validationSchema = Yup.object().shape({
      firstName: Yup.string().required('First Name is required!'),
      lastName: Yup.string().required('Last Name is required!'),
   });

   return (
      <Stack
         spacing={4}
         w={'full'}
         maxW={'md'}
         bg={useColorModeValue('white', 'gray.700')}
      >
         <Formik
            initialValues={editData}
            onSubmit={onFormSubmit}
            validationSchema={validationSchema}
         >
            {({
               handleChange,
               handleBlur,
               handleSubmit,
               values,
               errors,
               touched,
            }) => (
               <>
                  <Center>
                     <Avatar size='xl' name={editData.username} />
                  </Center>
                  <FormControl id='role'>
                     <FormLabel>Role</FormLabel>
                     <Select
                        value={values.role}
                        placeholder='Select option'
                        onChange={handleChange}
                     >
                        <option value='admin'>Admin</option>
                        <option value='user'>User</option>
                        <option value='receptionist'>Receptionist</option>
                        <option value='housekeeper'>Housekeeper</option>
                        <option value='restaurantMG'>RestaurantMG</option>
                     </Select>
                  </FormControl>
                  <HStack spacing='6'>
                     <FormControl
                        id='firstName'
                        isInvalid={errors.firstName && touched.firstName}
                     >
                        <FormLabel>First Name</FormLabel>
                        <Input
                           id='firstName'
                           placeholder='First Name'
                           onChange={handleChange}
                           value={values.firstName}
                        />
                        <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                     </FormControl>
                     <FormControl
                        id='lastName'
                        isInvalid={errors.lastName && touched.lastName}
                     >
                        <FormLabel>Last Name</FormLabel>
                        <Input
                           placeholder='Last Name'
                           id='lastName'
                           onChange={handleChange}
                           value={values.lastName}
                        />
                        <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                     </FormControl>
                  </HStack>
                  <FormControl id='userName'>
                     <FormLabel>User name</FormLabel>
                     <Input
                        disabled
                        value={editData.username}
                        placeholder='UserName'
                        bg='gray.200'
                        type='text'
                     />
                  </FormControl>
                  <FormControl id='resetPassword'>
                     <FormLabel>Password</FormLabel>
                     <Button
                        colorScheme='blue'
                        variant='outline'
                        w='full'
                        onClick={onClickResetPassword}
                     >
                        Reset Password
                     </Button>
                  </FormControl>
                  <Stack
                     spacing={4}
                     direction={['column', 'row']}
                     w={'full'}
                     maxW={'md'}
                     pb='4'
                  >
                     <Button
                        bg={'red.400'}
                        color={'white'}
                        w='full'
                        _hover={{
                           bg: 'red.500',
                        }}
                        onClick={onClose}
                     >
                        Cancel
                     </Button>
                     <Button
                        bg={'blue.400'}
                        color={'white'}
                        w='full'
                        _hover={{
                           bg: 'blue.500',
                        }}
                        onClick={handleSubmit}
                     >
                        Submit
                     </Button>
                  </Stack>
               </>
            )}
         </Formik>
      </Stack>
   );
};

function EditProfileModal(props) {
   const [editData, setEditData] = useState({});
   const { userId } = useParams();
   const toast = useToast();

   let location = useLocation();
   const navigate = useNavigate();

   useEffect(() => {
      const getOldUserDataInDb = async () => {
         try {
            const response = await userApi.userProfile({
               userId: userId,
            });

            setEditData({
               id: response.id,
               firstName: response.profile.firstName,
               lastName: response.profile.lastName,
               username: response.username,
               role: response.role.name,
            });
         } catch (error) {
            console.log(error);
         }
      };
      getOldUserDataInDb();
   }, [userId]);

   const onFormSubmit = async (formData) => {
      try {
         const response = await userApi.editProfile(formData);
         if (response.message === 'edit_account_success') {
            showToastNotification(
               'Successful',
               `Edit ${response.username} Success`,
               'success',
            );
            navigate(-1);
         }
      } catch (error) {
         console.log(error);
      }
   };

   const onClickResetPassword = async () => {
      try {
         const response = await userApi.resetPassword({ userId });
         if (response.message === 'reset_password_success') {
            showToastNotification(
               'Successful',
               `Reset Password of ${response.username} success`,
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
         <Modal
            isCentered
            onClose={() => navigate(-1)}
            isOpen={location.state?.backgroundLocation ? true : false}
            motionPreset='slideInBottom'
         >
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Edit Profile</ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  {Object.keys(editData).length > 0 && (
                     <EditForm
                        onFormSubmit={onFormSubmit}
                        editData={editData}
                        onClose={() => navigate(-1)}
                        onClickResetPassword={onClickResetPassword}
                     />
                  )}
               </ModalBody>
            </ModalContent>
         </Modal>
      </>
   );
}

export default EditProfileModal;
