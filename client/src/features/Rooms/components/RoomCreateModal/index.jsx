// import PropTypes from 'prop-types';
import {
   Button,
   FormControl,
   FormErrorMessage,
   FormLabel,
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
} from '@chakra-ui/react';
import { Formik } from 'formik';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import roomApi from '../../../../api/roomApi';

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
            <ModalBody>
               <CreateModalForm />
            </ModalBody>
         </ModalContent>
      </Modal>
   );
}

const CreateModalForm = () => {
   const navigate = useNavigate();
   const initialValues = {
      name: '',
      roomNumber: '',
      floor: '',
      roomType: 'single',
      price: '',
      bedroom: 'single',
   };

   const validationSchema = Yup.object().shape({
      name: Yup.string().required('Name is required!'),
      roomNumber: Yup.number()
         .typeError('Must be number')
         .required('Room Number is required!'),
      floor: Yup.number()
         .typeError('Must be number')
         .required('Floor is required!'),
      roomType: Yup.string().required('Room Type is required'),
      price: Yup.number()
         .typeError('Must be number')
         .required('Price is required!'),
      bedroom: Yup.string().required('Bedroom is required!'),
   });

   const onFormSubmit = async (formData) => {
      try {
         const response = await roomApi.createRoom(formData);
         if (response.message === 'room_created_successfully')
            return navigate(-1);

         // console.log('fomrData', formData);
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <Stack
         spacing={4}
         w={'full'}
         maxW={'md'}
         bg={useColorModeValue('white', 'gray.700')}
      >
         <Formik
            initialValues={initialValues}
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
                  <FormControl
                     id='roomNumber'
                     isInvalid={errors.roomNumber && touched.roomNumber}
                  >
                     <FormLabel>Room Number</FormLabel>
                     <Input value={values.roomNumber} onChange={handleChange} />
                     <FormErrorMessage>{errors.roomNumber}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                     id='name'
                     isInvalid={errors.name && touched.name}
                  >
                     <FormLabel>Room Name</FormLabel>
                     <Input value={values.name} onChange={handleChange} />
                     <FormErrorMessage>{errors.name}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                     id='floor'
                     isInvalid={errors.floor && touched.floor}
                  >
                     <FormLabel>Floor</FormLabel>
                     <Input value={values.floor} onChange={handleChange} />
                     <FormErrorMessage>{errors.floor}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                     id='price'
                     isInvalid={errors.price && touched.price}
                  >
                     <FormLabel>Price</FormLabel>
                     <Input value={values.price} onChange={handleChange} />
                     <FormErrorMessage>{errors.price}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                     id='bedroom'
                     isInvalid={errors.bedroom && touched.bedroom}
                  >
                     <FormLabel>Bedroom</FormLabel>
                     <Select
                        onChange={handleChange}
                        value={values.bedroom}
                        placeholder='Select Bedroom'
                     >
                        <option value='single'>Single</option>
                        <option value='double'>Double</option>
                        <option value='studio'>Studio</option>
                        <option value='suite'>Suite</option>
                     </Select>
                  </FormControl>
                  <FormControl id='roomType'>
                     <FormLabel>Room Type</FormLabel>
                     <Select
                        onChange={handleChange}
                        value={values.roomType}
                        placeholder='Select Room Type'
                     >
                        <option value='single'>Single</option>
                        <option value='double'>Double</option>
                        <option value='vip'>Vip</option>
                     </Select>
                     {/* <FormErrorMessage>{errors.roomType}</FormErrorMessage> */}
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
                        onClick={() => navigate(-1)}
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

export default RoomCreateModal;
