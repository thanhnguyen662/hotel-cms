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

AddEvent.propTypes = {
   onClose: PropTypes.func,
};

function AddEvent(props) {
   //STATE
   const [endLimit, setEndLimit] = useState(new Date());
   //PROPS
   const { onClose } = props;

   //YUP
   const validationSchema = Yup.object().shape({
      name: Yup.string().required('Event name is required!'),
      detail: Yup.string().required('Event detail is required!'),
      start: Yup.date()
         .min(new Date(), 'End date invalid')
         .required('Start date invalid'),
      end: Yup.date()
         .min(endLimit, 'End date invalid')
         .required('End date invalid'),
   });

   return (
      <Stack
         spacing={5}
         w={'full'}
         maxW={'md'}
         bg={useColorModeValue('white', 'gray.700')}
      >
         <Formik
            onSubmit={(values) => console.log(values)}
            validationSchema={validationSchema}
            initialValues={{
               name: '',
               detail: '',
               start: new Date(),
               end: new Date(),
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
                           style={{ width: '180px' }}
                           data-enable-time
                           value={values.start}
                           onChange={(value) => {
                              setFieldValue('start', value);
                              setEndLimit(value);
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
                           style={{ width: '180px' }}
                           data-enable-time
                           value={values.end}
                           // onChange={handleChange('end')}
                           onChange={(value) => {
                              setFieldValue('end', value);
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
                        Add
                     </Button>
                  </Stack>
               </>
            )}
         </Formik>
      </Stack>
   );
}

export default AddEvent;
