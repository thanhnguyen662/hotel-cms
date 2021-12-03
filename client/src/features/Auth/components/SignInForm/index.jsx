import {
   Alert,
   AlertIcon,
   Box,
   Button,
   Flex,
   FormControl,
   FormErrorMessage,
   FormLabel,
   Heading,
   Input,
   Link,
   Stack,
   Text,
   useColorModeValue,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import * as Yup from 'yup';

SignInForm.propTypes = {
   onSignInFormSubmit: PropTypes.func,
   isAlert: PropTypes.bool,
};

SignInForm.defaultProps = {
   onSignInFormSubmit: null,
   isAlert: false,
};

function SignInForm(props) {
   const { onSignInFormSubmit, isAlert } = props;

   const initialValues = {
      username: '',
      password: '',
   };

   const validationSchema = Yup.object().shape({
      username: Yup.string().required('Username is required!'),
      password: Yup.string().required('Password is required!'),
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
                  <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                  <Text fontSize={'lg'} color={'gray.600'}>
                     to enjoy all of our cool{' '}
                     <Link color={'blue.400'}>features</Link> ✌️
                  </Text>
               </Stack>
               <Box
                  rounded={'lg'}
                  bg={useColorModeValue('white', 'gray.700')}
                  boxShadow={'lg'}
                  p={8}
               >
                  <Stack spacing={4}>
                     {isAlert && (
                        <Alert status='error' borderRadius='5'>
                           <AlertIcon />
                           Incorrect username or password.
                        </Alert>
                     )}

                     <Formik
                        initialValues={initialValues}
                        onSubmit={onSignInFormSubmit}
                        validationSchema={validationSchema}
                     >
                        {({
                           handleChange,
                           handleSubmit,
                           values,
                           errors,
                           touched,
                        }) => (
                           <>
                              <FormControl
                                 isInvalid={errors.username && touched.username}
                              >
                                 <FormLabel>Username</FormLabel>
                                 <Input
                                    onChange={handleChange}
                                    id='username'
                                    value={values.username}
                                 />
                                 <FormErrorMessage>
                                    {errors.username}
                                 </FormErrorMessage>
                              </FormControl>
                              <FormControl
                                 isInvalid={errors.password && touched.password}
                              >
                                 <FormLabel>Password</FormLabel>
                                 <Input
                                    type='password'
                                    onChange={handleChange}
                                    id='password'
                                    value={values.password}
                                 />
                                 <FormErrorMessage>
                                    {errors.password}
                                 </FormErrorMessage>
                              </FormControl>
                              <Button
                                 bg={'blue.400'}
                                 color={'white'}
                                 _hover={{
                                    bg: 'blue.500',
                                 }}
                                 type='submit'
                                 onClick={handleSubmit}
                              >
                                 Sign in
                              </Button>
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

export default SignInForm;
