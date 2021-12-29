// import PropTypes from 'prop-types';
import {
   Box,
   Button,
   Divider,
   FormControl,
   FormErrorMessage,
   FormLabel,
   Heading,
   HStack,
   Input,
   Select,
   Spacer,
   Stack,
   Text,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import moment from 'moment';
import React from 'react';
import Flatpickr from 'react-flatpickr';
import * as Yup from 'yup';

OrderInformationForm.propTypes = {};

function OrderInformationForm(props) {
   const {
      countryOptions,
      handleSubmitOrder,
      handleAddCustomerToRoom,
      selectAddCustomerRoom,
      customerOrderRoom,
      defaultData,
   } = props;

   const initialValues = {
      firstName: '',
      lastName: '',
      idCard: '',
      phoneNumber: '+84',
      country: 'Vietnam/+84',
      dob: moment().toDate(),
   };

   const phoneRegExp =
      /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
   const validationSchema = Yup.object().shape({
      firstName: Yup.string().required('First Name is required!'),
      lastName: Yup.string().required('Last Name is required!'),
      idCard: Yup.string().required('Id Card is required!'),
      phoneNumber: Yup.string()
         .matches(phoneRegExp, 'Phone number is not valid')
         .required('Phone Number is required!'),
   });

   const onClickAddCustomerOrderRoom = (formData, resetForm) => {
      handleAddCustomerToRoom(formData, resetForm);
   };

   const onClickSubmitOrder = () => {
      handleSubmitOrder();
   };

   const roomInOrder = defaultData?.reduce((array, item) => {
      if (array.some((i) => i === item)) return array;
      array.push(item.number);
      return array;
   }, []);

   const isOrderButtonDisabled = () => {
      let isDisabled = true;
      if (roomInOrder.length === 0) return (isDisabled = false);
      roomInOrder?.map((item) => {
         // eslint-disable-next-line
         if (isDisabled === false) return;
         const isCustomerInRoom = customerOrderRoom.some(
            (i) => item === i.roomId,
         );
         if (isCustomerInRoom) return (isDisabled = true);

         return (isDisabled = false);
      });

      return isDisabled;
   };
   const isOrderDisabled = isOrderButtonDisabled();

   return (
      <Box bg='white' rounded='lg' boxShadow='xl' h='full'>
         <Stack px='7' spacing='5' pb='8'>
            <Formik
               initialValues={initialValues}
               onSubmit={(value, { resetForm }) =>
                  onClickAddCustomerOrderRoom(value, resetForm)
               }
               validationSchema={validationSchema}
            >
               {({
                  handleChange,
                  handleSubmit,
                  setFieldValue,
                  values,
                  errors,
                  touched,
               }) => (
                  <>
                     <HStack pt='6'>
                        <Box>
                           <Heading fontSize='20' mb='2'>
                              {selectAddCustomerRoom === 0
                                 ? 'Please select a room'
                                 : `Add customer for ${selectAddCustomerRoom}`}
                           </Heading>
                           <Text fontSize='14'>
                              Ad ullamco magna eu proident dolor.
                           </Text>
                        </Box>
                        <Spacer />
                        <Button
                           colorScheme='blue'
                           variant='outline'
                           onClick={handleSubmit}
                           disabled={selectAddCustomerRoom === 0 ? true : false}
                        >
                           Add
                        </Button>
                        <Button
                           colorScheme='red'
                           variant='solid'
                           onClick={onClickSubmitOrder}
                           isDisabled={!isOrderDisabled}
                        >
                           Order Now!
                        </Button>
                     </HStack>
                     <Divider my='5' />
                     <HStack spacing='5'>
                        <FormControl
                           id='firstName'
                           isInvalid={errors.firstName && touched.firstName}
                           isRequired
                        >
                           <FormLabel>First Name</FormLabel>
                           <Input
                              value={values.firstName}
                              onChange={handleChange}
                           />
                           <FormErrorMessage>
                              {errors.firstName}
                           </FormErrorMessage>
                        </FormControl>
                        <FormControl
                           id='lastName'
                           isInvalid={errors.lastName && touched.lastName}
                           isRequired
                        >
                           <FormLabel>Last Name</FormLabel>
                           <Input
                              value={values.lastName}
                              onChange={handleChange}
                           />
                           <FormErrorMessage>
                              {errors.lastName}
                           </FormErrorMessage>
                        </FormControl>
                     </HStack>
                     <FormControl
                        id='idCard'
                        isInvalid={errors.idCard && touched.idCard}
                        isRequired
                     >
                        <FormLabel>ID Card</FormLabel>
                        <Input value={values.idCard} onChange={handleChange} />
                        <FormErrorMessage>{errors.idCard}</FormErrorMessage>
                     </FormControl>

                     <FormControl
                        id='country'
                        isRequired
                        isInvalid={errors.country && touched.country}
                     >
                        <FormLabel>Country</FormLabel>
                        <Select
                           value={values.country}
                           onChange={(e) => {
                              const split = e.target.value.split('/');
                              setFieldValue('country', e.target.value);
                              setFieldValue('phoneNumber', split[1]);
                           }}
                        >
                           {countryOptions?.map((option) => (
                              <option
                                 key={option.iso}
                                 value={`${option.country}/${option.prefix}`}
                              >
                                 {option.country}
                              </option>
                           ))}
                        </Select>
                        <FormErrorMessage>{errors.country}</FormErrorMessage>
                     </FormControl>
                     <FormControl
                        id='phoneNumber'
                        isRequired
                        isInvalid={errors.phoneNumber && touched.phoneNumber}
                     >
                        <FormLabel>Phone Number</FormLabel>
                        <Input
                           type='tel'
                           onChange={handleChange}
                           value={values.phoneNumber}
                        />
                        <FormErrorMessage>
                           {errors.phoneNumber}
                        </FormErrorMessage>
                     </FormControl>

                     <FormControl
                        id='dob'
                        isRequired
                        isInvalid={errors.dob && touched.dob}
                     >
                        <FormLabel>Date of Birth</FormLabel>
                        <Flatpickr
                           value={values.dob}
                           onChange={(value) => setFieldValue(value)}
                           style={{
                              borderWidth: '1px',
                              height: '100%',
                              width: '100%',
                              borderRadius: '8px',
                              padding: '10px 15px',
                           }}
                        />
                        <FormErrorMessage>{errors.dob}</FormErrorMessage>
                     </FormControl>

                     {/* <Button onClick={handleSubmit}>OK</Button> */}
                  </>
               )}
            </Formik>
         </Stack>
      </Box>
   );
}

export default OrderInformationForm;
