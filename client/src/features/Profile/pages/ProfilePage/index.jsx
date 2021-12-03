import { Box, Stack } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import userApi from '../../../../api/userApi';
import { useParams } from 'react-router-dom';
import BreadcrumbBar from '../../../../components/BreadcrumbBar';
import UserInfo from '../../components/UserInfo';
import UserRelatedInfo from '../../components/UserRelatedInfo';

function ProfilePage(props) {
   const { userId } = useParams();
   const [userProfile, setUserProfile] = useState({});

   useEffect(() => {
      const getUserProfile = async () => {
         try {
            const response = await userApi.userProfile({
               userId,
            });
            setUserProfile(response);
         } catch (error) {
            console.log(error);
         }
      };
      getUserProfile();
   }, [userId]);

   return (
      <Box>
         <BreadcrumbBar username={userProfile.username} />
         <Stack direction={['column', 'row']} spacing='24px'>
            <Box flex='1'>
               <UserInfo userProfile={userProfile} />
            </Box>
            <Box flex='2'>
               <UserRelatedInfo />
            </Box>
         </Stack>
      </Box>
   );
}

export default ProfilePage;
