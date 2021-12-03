import React, { useState } from 'react';
import userApi from '../../../../api/userApi';
import SignInForm from '../../components/SignInForm';

function SignInPage(props) {
   const [isAlert, setIsAlert] = useState(false);
   const handleSignInFormSubmit = async (formData) => {
      try {
         const response = await userApi.login(formData);
         if (response.message === 'user_not_exist') return setIsAlert(true);
         return (window.location = '/');
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <>
         <SignInForm
            onSignInFormSubmit={handleSignInFormSubmit}
            isAlert={isAlert}
         />
      </>
   );
}

export default SignInPage;
