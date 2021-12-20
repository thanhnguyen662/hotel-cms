import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
   Avatar,
   Button,
   Center,
   FormControl,
   FormLabel,
   HStack,
   Input,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalHeader,
   ModalOverlay,
   Select,
   Stack,
   useColorModeValue,
   FormErrorMessage,
   NumberInput,
   NumberInputField,
   Box,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import restaurantApi from '../../../../api/restaurantApi';

AddFoods.propTypes = {
   onClose: PropTypes.func,
   handleAdd: PropTypes.func,
};

const handleFoodTable = (data) => {};

function AddFoods(props) {
   //PROPS
   const { onClose, handleAdd } = props;

   //YUP
   const validationSchema = Yup.object().shape({
      name: Yup.string().required('Food type is required!'),
      type: Yup.string().required('Food type is required!'),
      price: Yup.number().min(1).required('Minimum price is 1$'),
   });

   //FUNCTION
   const handleAddFood = async (data) => {
      const addFoodRes = await restaurantApi.addFood(data);
      handleAdd(addFoodRes);
   };

   return (
      <Stack
         spacing={5}
         w={'full'}
         maxW={'md'}
         bg={useColorModeValue('white', 'gray.700')}
      >
         <Formik
            onSubmit={(values) => handleAddFood(values)}
            validationSchema={validationSchema}
            initialValues={{
               name: '',
               type: '',
               price: 1,
            }}
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
                     id='name'
                     isInvalid={errors.name && touched.name}
                  >
                     <FormLabel>Service name</FormLabel>
                     <Input
                        id='name'
                        placeholder='Enter service name'
                        value={values.name}
                        onChange={handleChange('name')}
                     />
                     <FormErrorMessage>{errors.name}</FormErrorMessage>
                  </FormControl>
                  <HStack spacing='6'>
                     <FormControl
                        id='type'
                        isInvalid={errors.type && touched.type}
                     >
                        <FormLabel>Service type</FormLabel>
                        <Select
                           placeholder='Select service type'
                           onChange={handleChange('type')}
                           value={values.type}
                        >
                           <option value='Entertainment'>Entertainment</option>
                           <option value='Spa'>Spa</option>
                           <option value='Sport'>Sport</option>
                           <option value='Food'>Food</option>
                        </Select>
                        <FormErrorMessage>{errors.type}</FormErrorMessage>
                     </FormControl>
                     <FormControl
                        id='price'
                        isInvalid={errors.price && touched.price}
                     >
                        <FormLabel>Price</FormLabel>
                        <NumberInput
                           placeholder='Enter food price'
                           id='price'
                           min={1}
                           onChange={handleChange('price')}
                           value={values.price}
                        >
                           <NumberInputField />
                        </NumberInput>
                        <FormErrorMessage>{errors.price}</FormErrorMessage>
                     </FormControl>
                  </HStack>
                  <Box
                     w='full'
                     h='100px'
                     mt='10px'
                     color='white'
                     borderRadius='lg'
                     borderWidth='3px'
                  >
                     <Center
                        h='full'
                        w='full'
                        color='#E2E8F0'
                        fontSize='20px'
                        fontWeight='550'
                     >
                        Drag and Drop image to upload
                     </Center>
                  </Box>
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

export default AddFoods;
