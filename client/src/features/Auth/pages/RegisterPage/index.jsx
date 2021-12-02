import { useToast } from '@chakra-ui/toast';
import React from 'react';
import { useNavigate } from 'react-router';
import userApi from '../../../../api/userApi';
import RegisterForm from '../../components/RegisterForm';

function RegisterPage(props) {
   const toast = useToast();
   const navigate = useNavigate();

   const handleRegisterFormSubmit = async (formData) => {
      try {
         const response = await userApi.register(formData);
         if (response.message === 'username_exist')
            return toast({
               title: 'Error.',
               description: 'Username already exists.',
               status: 'error',
               duration: 9000,
               isClosable: true,
            });

         toast({
            title: 'Account created.',
            description: "We've created your account for you.",
            status: 'success',
            duration: 9000,
            isClosable: true,
         });
         navigate('/account/login');
      } catch (error) {
         console.log(error);
      }
   };

   return <RegisterForm onRegisterFormSubmit={handleRegisterFormSubmit} />;
}

export default RegisterPage;
