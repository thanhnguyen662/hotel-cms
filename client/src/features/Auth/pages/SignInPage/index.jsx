import React from 'react';
import {
   Flex,
   Box,
   FormControl,
   FormLabel,
   Input,
   Checkbox,
   Stack,
   Link,
   Button,
   Heading,
   Text,
   useColorModeValue,
   FormErrorMessage,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import * as Yup from 'yup';

function SignInPage(props) {
   const initialValues = {
      username: '',
      password: '',
   };

   const validationSchema = Yup.object().shape({
      username: Yup.string().required('Username is required!'),
      password: Yup.string().required('Password is required!'),
   });

   const onSignInFormSubmit = (formData) => {
      console.log(formData);
   };

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
                     <Formik
                        initialValues={initialValues}
                        onSubmit={onSignInFormSubmit}
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
                              <Stack spacing={10}>
                                 <Stack
                                    direction={{ base: 'column', sm: 'row' }}
                                    align={'start'}
                                    justify={'space-between'}
                                 >
                                    <Checkbox>Remember me</Checkbox>
                                    <Link color={'blue.400'}>
                                       Forgot password?
                                    </Link>
                                 </Stack>
                                 <Button
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                       bg: 'blue.500',
                                    }}
                                    onClick={handleSubmit}
                                 >
                                    Sign in
                                 </Button>
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

export default SignInPage;
