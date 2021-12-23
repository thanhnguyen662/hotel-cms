import {
   Box,
   Button,
   Center,
   FormControl,
   FormErrorMessage,
   FormLabel,
   HStack,
   Input,
   NumberInput,
   NumberInputField,
   Select,
   Stack,
   useColorModeValue,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import * as Yup from 'yup';
import serviceApi from '../../../../api/serviceApi';

EditService.propTypes = {
   onClose: PropTypes.func,
   handleEdit: PropTypes.func,
};

function EditService(props) {
   //PROPS
   const { onClose, modalData, handleEdit } = props;

   //YUP
   const validationSchema = Yup.object().shape({
      name: Yup.string().required('Food type is required!'),
      type: Yup.string().required('Food type is required!'),
      price: Yup.number().min(1).required('Minimum price is 1$'),
   });

   //FUNCTION
   const handleEditService = async (data) => {
      const dataDestructuring = {
         id: modalData.id,
         image: modalData.image,
         name: data.name,
         type: data.type,
         price: parseInt(data.price),
      };
      const editServiceRes = await serviceApi.editService(dataDestructuring);
      handleEdit(editServiceRes);
   };

   return (
      <Stack
         spacing={5}
         w={'full'}
         maxW={'md'}
         bg={useColorModeValue('white', 'gray.700')}
      >
         <Formik
            onSubmit={(values) => handleEditService(values)}
            validationSchema={validationSchema}
            initialValues={{
               name: modalData.name,
               type: modalData.type,
               price: modalData.price,
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
                        placeholder='Enter food name'
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
                           placeholder='Select food type'
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
                           placeholder='Enter service price'
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
                        Edit
                     </Button>
                  </Stack>
               </>
            )}
         </Formik>
      </Stack>
   );
}

export default EditService;
