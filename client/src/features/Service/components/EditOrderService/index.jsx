import {
   Box,
   Button,
   FormControl,
   FormErrorMessage,
   FormLabel,
   Input,
   NumberInput,
   NumberInputField,
   Stack,
   useColorModeValue,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Flatpickr from 'react-flatpickr';
import * as Yup from 'yup';
import serviceApi from '../../../../api/serviceApi';

EditOrderService.propTypes = {
   onClose: PropTypes.func,
   serviceCardData: PropTypes.object,
   handleEditOrderServiceProps: PropTypes.func,
};

function EditOrderService(props) {
   //PROPS
   const { onClose, serviceCardData, handleEditOrderServiceProps } = props;
   //STATE
   const [editData, setEditData] = useState({});
   //EFFECT
   useEffect(() => {
      setEditData({
         id: serviceCardData.id,
         oderItemId: serviceCardData.oderItemId,
         serviceId: serviceCardData.serviceId,
         start: serviceCardData.servedAt,
         tickets: serviceCardData.tickets,
      });
   }, [serviceCardData]);

   //YUP
   const validationSchema = Yup.object().shape({
      tickets: Yup.number().required('Number of guests is required!'),
      start: Yup.date().required('Time of service is required!'),
   });

   //Function
   const handelEditService = async (data) => {
      const dataDestructuring = {
         ...editData,
         ...data,
      };
      const editServiceRes = await serviceApi.editOrderService(
         dataDestructuring,
      );

      handleEditOrderServiceProps(editServiceRes);
      onClose();
   };

   return (
      <Stack
         spacing={5}
         w={'full'}
         maxW={'md'}
         bg={useColorModeValue('white', 'gray.700')}
      >
         <Formik
            onSubmit={(values) => handelEditService(values)}
            validationSchema={validationSchema}
            initialValues={{
               tickets: serviceCardData.tickets,
               start: serviceCardData.servedAt,
            }}
         >
            {({
               handleChange,
               handleBlur,
               handleSubmit,
               values,
               errors,
               touched,
               setFieldValue,
            }) => (
               <>
                  <FormControl>
                     <FormLabel>Service name</FormLabel>
                     <Input
                        value={serviceCardData.service?.name}
                        disabled={true}
                     ></Input>
                  </FormControl>
                  <FormControl
                     id='tickets'
                     isInvalid={errors.tickets && touched.tickets}
                  >
                     <FormLabel>Number of guests</FormLabel>
                     <NumberInput
                        placeholder='Enter number of guests'
                        id='tickets'
                        min={1}
                        onChange={handleChange('tickets')}
                        value={values.tickets}
                     >
                        <NumberInputField />
                     </NumberInput>
                     <FormErrorMessage>{errors.tickets}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                     id='start'
                     isInvalid={errors.start && touched.start}
                  >
                     <FormLabel>Start at</FormLabel>
                     <Box w='full' borderWidth='1px' borderRadius='lg'>
                        <Flatpickr
                           id='start'
                           onChange={(value) => {
                              setFieldValue('start', value);
                           }}
                           options={{
                              minDate: moment().subtract(1, 'minute').toDate(),
                              enableTime: true,
                              defaultDate: values.start,
                           }}
                           style={{
                              height: '100%',
                              borderRadius: '8px',
                              padding: '9.5px 5px',
                              width: '100%',
                              borderColor: 'gray',
                           }}
                        ></Flatpickr>
                     </Box>
                     <FormErrorMessage>{errors.start}</FormErrorMessage>
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
                        onClick={() => {
                           onClose();
                        }}
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
                        Edit
                     </Button>
                  </Stack>
               </>
            )}
         </Formik>
      </Stack>
   );
}

export default EditOrderService;
