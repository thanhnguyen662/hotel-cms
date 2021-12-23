import {
   Button,
   FormControl,
   FormErrorMessage,
   FormLabel,
   HStack,
   Input,
   Stack,
   Textarea,
   useColorModeValue,
} from '@chakra-ui/react';
import 'flatpickr/dist/themes/material_green.css';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Flatpickr from 'react-flatpickr';
import * as Yup from 'yup';
import eventApi from '../../../../api/eventApi';
EditEvent.propTypes = {
   onClose: PropTypes.func,
   editEventData: PropTypes.object,
   editEventProp: PropTypes.func,
};

function EditEvent(props) {
   //STATE
   const [endLimit, setEndLimit] = useState(new Date());
   // eslint-disable-next-line
   const [startLimit, setStartLimit] = useState(new Date());
   //PROPS
   const { onClose, editEventData, editEventProp } = props;

   //YUP
   const validationSchema = Yup.object().shape({
      name: Yup.string().required('Event name is required!'),
      detail: Yup.string().required('Event detail is required!'),
      start: Yup.date()
         .min(startLimit, 'End date invalid')
         .required('Start date invalid'),
      end: Yup.date()
         .min(endLimit, 'End date invalid')
         .required('End date invalid'),
   });

   //Function
   const handleEditEvent = async (data) => {
      const dataDestructuring = {
         ...editEventData,
         ...data,
      };
      console.log(dataDestructuring);
      const addEvent = await eventApi.editEvent(dataDestructuring);
      editEventProp(addEvent);
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
            onSubmit={(values) => handleEditEvent(values)}
            validationSchema={validationSchema}
            initialValues={{
               name: editEventData.name,
               detail: editEventData.detail,
               start: new Date(editEventData.start),
               end: new Date(editEventData.end),
            }}
         >
            {({
               handleChange,
               handleBlur,
               handleSubmit,
               setFieldValue,
               values,
               errors,
               touched,
            }) => (
               <>
                  <FormControl
                     id='name'
                     isInvalid={errors.name && touched.name}
                  >
                     <FormLabel>Event name</FormLabel>
                     <Input
                        id='name'
                        placeholder='Enter event name'
                        value={values.name}
                        onChange={handleChange('name')}
                     />
                     <FormErrorMessage>{errors.name}</FormErrorMessage>
                  </FormControl>
                  <HStack spacing='6'>
                     <FormControl
                        id='start'
                        isInvalid={errors.start && touched.start}
                     >
                        <FormLabel>Start At</FormLabel>
                        <Flatpickr
                           style={{
                              width: '180px',
                              border: '1px solid',
                              borderRadius: '5px',
                              borderColor: 'gray',
                           }}
                           options={{ minDate: startLimit }}
                           data-enable-time
                           value={values.start}
                           onChange={(value) => {
                              setFieldValue('start', value[0]);
                              value.length && setEndLimit(new Date(value));
                           }}
                        />
                        <FormErrorMessage>{errors.start}</FormErrorMessage>
                     </FormControl>
                     <FormControl
                        id='end'
                        isInvalid={errors.end && touched.end}
                     >
                        <FormLabel>Ends At</FormLabel>
                        <Flatpickr
                           options={{ minDate: endLimit }}
                           style={{
                              width: '180px',
                              border: '1px solid',
                              borderRadius: '5px',
                              borderColor: 'gray',
                           }}
                           data-enable-time
                           value={values.end}
                           onChange={(value) => {
                              setFieldValue('end', value[0]);
                           }}
                        />
                        <FormErrorMessage>{errors.end}</FormErrorMessage>
                     </FormControl>
                  </HStack>
                  <FormControl
                     id='detail'
                     isInvalid={errors.detail && touched.detail}
                  >
                     <FormLabel>Detail</FormLabel>
                     <Textarea
                        value={values.detail}
                        onChange={handleChange('detail')}
                        placeholder='Enter event detail'
                        size='sm'
                        maxH='90px'
                     />
                     <FormErrorMessage>{errors.detail}</FormErrorMessage>
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

export default EditEvent;
