import React from 'react';
import PropTypes from 'prop-types';
import {
   Flex,
   Box,
   FormControl,
   FormLabel,
   Input,
   InputGroup,
   HStack,
   InputRightElement,
   Stack,
   Button,
   Heading,
   Text,
   useColorModeValue,
   FormErrorMessage,
   Link,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

RegisterForm.propTypes = {
   onRegisterFormSubmit: PropTypes.func,
};

RegisterForm.defaultProps = {
   onRegisterFormSubmit: null,
};

function RegisterForm(props) {
   const { onRegisterFormSubmit } = props;
   const [showPassword, setShowPassword] = useState(false);
   const navigate = useNavigate();

   const initialValues = {
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      username: '',
   };

   const validationSchema = Yup.object().shape({
      username: Yup.string()
         .min(6, 'Must be more than 6 characters')
         .required('Username is required!'),
      firstName: Yup.string().required('First Name is required!'),
      lastName: Yup.string().required('Last Name is required!'),
      password: Yup.string()
         .min(6, 'Must be more than 6 characters')
         .required('Password is required!'),
      confirmPassword: Yup.string().oneOf(
         [Yup.ref('password'), null],
         'Passwords must match',
      ),
   });

   return (
      <>
         <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}
         >
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
               <Stack align={'center'}>
                  <Heading fontSize={'4xl'} textAlign={'center'}>
                     Sign up
                  </Heading>
                  <Text fontSize={'lg'} color={'gray.600'}>
                     to enjoy all of our cool features ✌️
                  </Text>
               </Stack>
               <Box
                  rounded={'lg'}
                  bg={useColorModeValue('white', 'gray.700')}
                  boxShadow={'lg'}
                  p={8}
               >
                  <Stack spacing={4}>
                     <Formik
                        initialValues={initialValues}
                        onSubmit={onRegisterFormSubmit}
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
                              <HStack>
                                 <Box>
                                    <FormControl
                                       isRequired
                                       isInvalid={
                                          errors.firstName && touched.firstName
                                       }
                                    >
                                       <FormLabel>First Name</FormLabel>
                                       <Input
                                          type='text'
                                          id='firstName'
                                          onChange={handleChange}
                                          value={values.firstName}
                                       />
                                       <FormErrorMessage>
                                          {errors.firstName}
                                       </FormErrorMessage>
                                    </FormControl>
                                 </Box>
                                 <Box>
                                    <FormControl
                                       isRequired
                                       isInvalid={
                                          errors.lastName && touched.lastName
                                       }
                                    >
                                       <FormLabel>Last Name</FormLabel>
                                       <Input
                                          type='text'
                                          id='lastName'
                                          onChange={handleChange}
                                          value={values.lastName}
                                       />
                                       <FormErrorMessage>
                                          {errors.lastName}
                                       </FormErrorMessage>
                                    </FormControl>
                                 </Box>
                              </HStack>
                              <FormControl
                                 isRequired
                                 isInvalid={errors.username && touched.username}
                              >
                                 <FormLabel>Username</FormLabel>
                                 <Input
                                    id='username'
                                    onChange={handleChange}
                                    value={values.username}
                                 />
                                 <FormErrorMessage>
                                    {errors.username}
                                 </FormErrorMessage>
                              </FormControl>
                              <FormControl
                                 isRequired
                                 isInvalid={errors.password && touched.password}
                              >
                                 <FormLabel>Password</FormLabel>
                                 <InputGroup>
                                    <Input
                                       type={showPassword ? 'text' : 'password'}
                                       id='password'
                                       onChange={handleChange}
                                       value={values.password}
                                    />
                                    <InputRightElement h={'full'}>
                                       <Button
                                          variant={'ghost'}
                                          onClick={() =>
                                             setShowPassword(
                                                (showPassword) => !showPassword,
                                             )
                                          }
                                       >
                                          {showPassword ? (
                                             <ViewIcon />
                                          ) : (
                                             <ViewOffIcon />
                                          )}
                                       </Button>
                                    </InputRightElement>
                                 </InputGroup>
                                 <FormErrorMessage>
                                    {errors.password}
                                 </FormErrorMessage>
                              </FormControl>
                              <FormControl
                                 isRequired
                                 isInvalid={
                                    errors.confirmPassword &&
                                    touched.confirmPassword
                                 }
                              >
                                 <FormLabel>Confirm Password</FormLabel>
                                 <InputGroup>
                                    <Input
                                       type={showPassword ? 'text' : 'password'}
                                       id='confirmPassword'
                                       onChange={handleChange}
                                       value={values.confirmPassword}
                                    />
                                    <InputRightElement h={'full'}>
                                       <Button
                                          variant={'ghost'}
                                          onClick={() =>
                                             setShowPassword(
                                                (showPassword) => !showPassword,
                                             )
                                          }
                                       >
                                          {showPassword ? (
                                             <ViewIcon />
                                          ) : (
                                             <ViewOffIcon />
                                          )}
                                       </Button>
                                    </InputRightElement>
                                 </InputGroup>
                                 <FormErrorMessage>
                                    {errors.confirmPassword}
                                 </FormErrorMessage>
                              </FormControl>
                              <Stack spacing={10} pt={2}>
                                 <Button
                                    loadingText='Submitting'
                                    size='lg'
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                       bg: 'blue.500',
                                    }}
                                    onClick={() => handleSubmit()}
                                 >
                                    Sign up
                                 </Button>
                              </Stack>
                              <Stack pt={6}>
                                 <Text align={'center'}>
                                    Already a user?{' '}
                                    <Link
                                       color={'blue.400'}
                                       onClick={() =>
                                          navigate('/account/login')
                                       }
                                    >
                                       Login
                                    </Link>
                                 </Text>
                              </Stack>
                           </>
                        )}
                     </Formik>
                  </Stack>
               </Box>
            </Stack>
         </Flex>
      </>
   );
}

export default RegisterForm;
