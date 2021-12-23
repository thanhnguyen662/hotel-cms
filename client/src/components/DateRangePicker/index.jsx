// import {
//    Button,
//    FormControl,
//    FormLabel,
//    Modal,
//    ModalBody,
//    ModalCloseButton,
//    ModalContent,
//    ModalHeader,
//    ModalOverlay,
//    Stack,
//    useColorModeValue,
//    FormErrorMessage,
// } from '@chakra-ui/react';
// import { Formik } from 'formik';
// // import * as Yup from 'yup';
// import moment from 'moment';
// import PropTypes from 'prop-types';
// import React, { useState } from 'react';
// import Flatpickr from 'react-flatpickr';
// import * as Yup from 'yup';

// DateRangePicker.propTypes = {
//    isOpenRangePicker: PropTypes.bool,
//    setIsOpenRangePicker: PropTypes.func,
// };

// DateRangePicker.defaultProps = {
//    isOpenRangePicker: false,
//    setIsOpenRangePicker: null,
// };

// function DateRangePicker(props) {
//    const { isOpenRangePicker, setIsOpenRangePicker } = props;
//    return (
//       <>
//          <Modal
//             isOpen={isOpenRangePicker}
//             onClose={() => setIsOpenRangePicker(false)}
//          >
//             <ModalOverlay />
//             <ModalContent>
//                <ModalHeader>Select Range Date</ModalHeader>
//                <ModalCloseButton />
//                <ModalBody>
//                   <Flatpickr
//                      id='startDate'
//                      data-enable-time
//                      // value={values.startDate}
//                      onChange={(value) => {
//                         console.log(value);
//                      }}
//                      style={{
//                         borderWidth: '1px',
//                         height: '100%',
//                         borderRadius: '8px',
//                         padding: '9.5px 5px',
//                         width: '100%',
//                      }}
//                      options={{
//                         minDate: moment().subtract(1, 'minute').toDate(),
//                         enableTime: true,
//                         mode: 'range',
//                         defaultDate: new Date(),
//                      }}
//                   />
//                </ModalBody>
//             </ModalContent>
//          </Modal>
//       </>
//    );
// }

// const RangePickerForm = (props) => {
//    const validationSchema = Yup.object().shape({
//       startDate: Yup.date()
//          .min(new Date(), 'End date invalid')
//          .required('Start date invalid'),
//       endDate: Yup.date()
//          .min(Yup.ref('startDate'), 'End date invalid')
//          .required('End date invalid'),
//    });

//    const initialValues = {
//       startDate: moment().toDate(),
//       endDate: moment().toDate(),
//    };

//    const onFormSubmit = (formData) => {
//       console.log({
//          startDate: formData.startDate,
//          endDate: formData.endDate,
//       });
//    };

//    return (
//       <>
//          <Stack
//             spacing={4}
//             w={'full'}
//             maxW={'md'}
//             bg={useColorModeValue('white', 'gray.700')}
//          >
//             <Formik
//                initialValues={initialValues}
//                onSubmit={onFormSubmit}
//                validationSchema={validationSchema}
//             >
//                {({
//                   handleChange,
//                   handleBlur,
//                   handleSubmit,
//                   values,
//                   errors,
//                   touched,
//                   setFieldValue,
//                }) => (
//                   <>
//                      <FormControl
//                         id='startDate'
//                         isInvalid={errors.startDate && touched.startDate}
//                      >
//                         <FormLabel>Start Date</FormLabel>
//                         <Flatpickr
//                            id='startDate'
//                            data-enable-time
//                            value={values.startDate}
//                            onChange={(value) => {
//                               setFieldValue('startDate', value[0]);
//                            }}
//                            style={{
//                               borderWidth: '1px',
//                               height: '100%',
//                               borderRadius: '8px',
//                               padding: '9.5px 5px',
//                               width: '100%',
//                            }}
//                            options={{
//                               minDate: moment().subtract(1, 'minute').toDate(),
//                               enableTime: true,
//                               mode: 'range',
//                            }}
//                         />
//                         <FormErrorMessage>{errors.startDate}</FormErrorMessage>
//                      </FormControl>
//                      <FormControl
//                         id='endDate'
//                         isInvalid={errors.endDate && touched.endDate}
//                      >
//                         <FormLabel>End Date</FormLabel>
//                         <Flatpickr
//                            data-enable-time
//                            value={values.endDate}
//                            onChange={(value) =>
//                               setFieldValue('endDate', value[0])
//                            }
//                            style={{
//                               borderWidth: '1px',
//                               height: '100%',
//                               borderRadius: '8px',
//                               padding: '9.5px 5px',
//                               width: '100%',
//                            }}
//                            options={{
//                               minDate: new Date(values.startDate),
//                            }}
//                         />
//                         <FormErrorMessage>{errors.endDate}</FormErrorMessage>
//                      </FormControl>
//                      <Stack
//                         spacing={4}
//                         direction={['column', 'row']}
//                         w={'full'}
//                         maxW={'md'}
//                         pb='4'
//                      >
//                         <Button
//                            bg={'red.400'}
//                            color={'white'}
//                            w='full'
//                            _hover={{
//                               bg: 'red.500',
//                            }}
//                            // onClick={onClose}
//                         >
//                            Cancel
//                         </Button>
//                         <Button
//                            bg={'blue.400'}
//                            color={'white'}
//                            w='full'
//                            _hover={{
//                               bg: 'blue.500',
//                            }}
//                            onClick={handleSubmit}
//                         >
//                            Submit
//                         </Button>
//                      </Stack>
//                   </>
//                )}
//             </Formik>
//          </Stack>
//       </>
//    );
// };

// export default DateRangePicker;
