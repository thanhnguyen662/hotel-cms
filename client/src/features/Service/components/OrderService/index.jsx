import {
   Box,
   Button,
   FormControl,
   FormErrorMessage,
   FormLabel,
   NumberInput,
   NumberInputField,
   Select,
   Stack,
   useColorModeValue,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import * as Yup from 'yup';
import serviceApi from '../../../../api/serviceApi';
OrderService.propTypes = {
   orderId: PropTypes.string,
};

function OrderService(props) {
   //PROPS
   const { onClose, orderId } = props;
   const [serviceData, setServiceData] = useState([]);
   //EFFECT
   useEffect(() => {
      const getService = async () => {
         const getServiceRes = await serviceApi.getAllService();
         setServiceData(getServiceRes);
      };
      getService();
   }, []);

   //YUP
   const validationSchema = Yup.object().shape({
      name: Yup.number().required('Service name is required!'),
      tickets: Yup.number().required('Number of guests is required!'),
      start: Yup.date().required('Time of service is required!'),
   });

   //Function
   const handleOrder = async (data) => {
      const dataDestructuring = {
         ...data,
         start: data.start[0],
         orderId: orderId,
      };
      const OrderRes = await serviceApi.oderService(dataDestructuring);
      console.log(OrderRes);
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
            onSubmit={(values) => handleOrder(values)}
            validationSchema={validationSchema}
            initialValues={{
               name: '',
               tickets: 1,
               start: new Date(),
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
                  <FormControl
                     id='name'
                     isInvalid={errors.name && touched.name}
                  >
                     <FormLabel>Service name</FormLabel>
                     <Select
                        placeholder='Select option'
                        flex='1'
                        defaultValue='all'
                        onChange={(e) => setFieldValue('name', e.target.value)}
                     >
                        {serviceData?.map((item) => (
                           <option key={item.id} value={item.id}>
                              {item.name}
                           </option>
                        ))}
                     </Select>
                     <FormErrorMessage>{errors.name}</FormErrorMessage>
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
                        Add
                     </Button>
                  </Stack>
               </>
            )}
         </Formik>
      </Stack>
   );
}

export default OrderService;
