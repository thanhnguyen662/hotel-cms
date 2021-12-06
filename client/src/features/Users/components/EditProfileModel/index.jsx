import {
   Avatar,
   Button,
   Center,
   FormControl,
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
   FormErrorMessage,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';

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
   const { isOpen, onClose, rowValues, onSubmit, onResetPassword } = props;
   const [editData, setEditData] = useState({});

   // console.log(rowValues);

   useEffect(() => {
      setEditData({
         id: rowValues.id,
         firstName: rowValues['profile.firstName'],
         lastName: rowValues['profile.lastName'],
         username: rowValues.username,
         role: rowValues['role.name'],
      });
   }, [rowValues]);

   const onFormSubmit = (formData) => {
      onSubmit(formData);
   };

   const onClickResetPassword = () => {
      onResetPassword(rowValues.id);
   };

   return (
      <>
         <Modal
            isCentered
            onClose={onClose}
            isOpen={isOpen}
            motionPreset='slideInBottom'
         >
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Edit Profile</ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  <EditForm
                     onFormSubmit={onFormSubmit}
                     editData={editData}
                     onClose={onClose}
                     onClickResetPassword={onClickResetPassword}
                  />
               </ModalBody>
               {/* <ModalFooter></ModalFooter> */}
            </ModalContent>
         </Modal>
      </>
   );
}

export default EditProfileModal;
