import React from 'react';
import userApi from '../../../../api/userApi';
import SignInForm from '../../components/SignInForm';

function SignInPage(props) {
   const handleSignInFormSubmit = async (formData) => {
      try {
         await userApi.login(formData);
         window.location = '/';
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <>
         <SignInForm onSignInFormSubmit={handleSignInFormSubmit} />
      </>
   );
}

export default SignInPage;
