import {
   Box,
   Button,
   FormControl,
   FormErrorMessage,
   FormLabel,
   Input,
   Stack,
   Textarea,
   useColorModeValue,
} from '@chakra-ui/react';
import 'flatpickr/dist/themes/material_green.css';
import { Formik } from 'formik';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import Flatpickr from 'react-flatpickr';
import * as Yup from 'yup';
import eventApi from '../../../../api/eventApi';
EditEvent.propTypes = {
   onClose: PropTypes.func,
   editEventData: PropTypes.object,
   editEventProp: PropTypes.func,
};

function EditEvent(props) {
   //PROPS
   const { onClose, editEventData, editEventProp } = props;

   //YUP
   const validationSchema = Yup.object().shape({
      name: Yup.string().required('Event name is required!'),
      detail: Yup.string().required('Event detail is required!'),
      dateTime: Yup.array().required('Event time is required!'),
   });

   //Function
   const handleEditEvent = async (data) => {
      const dataDestructuring = {
         ...editEventData,
         ...data,
         start: data.dateTime[0],
         end: data.dateTime[1],
      };
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
               dateTime: [editEventData.start, editEventData.end],
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
                  <FormControl
                     id='dateTime'
                     isInvalid={errors.dateTime && touched.dateTime}
                  >
                     <FormLabel>Start at - End at</FormLabel>
                     <Box w='full' borderWidth='1px' borderRadius='lg'>
                        <Flatpickr
                           id='dateTime'
                           onChange={(value) => {
                              setFieldValue('dateTime', value);
                           }}
                           options={{
                              minDate: moment().subtract(1, 'minute').toDate(),
                              enableTime: true,
                              mode: 'range',
                              defaultDate: values.dateTime,
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
                     <FormErrorMessage>{errors.dateTime}</FormErrorMessage>
                  </FormControl>
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
