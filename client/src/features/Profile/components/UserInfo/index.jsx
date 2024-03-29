import PropTypes from 'prop-types';
import {
   Avatar,
   Badge,
   Box,
   Button,
   Heading,
   Link,
   Stack,
   Text,
   useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';

UserInfo.propTypes = {
   userProfile: PropTypes.object,
};

UserInfo.defaultProps = {
   userProfile: {},
};

function UserInfo(props) {
   const { userProfile } = props;
   console.log('userProfile: ', userProfile);

   return (
      <Box
         // maxW={'350px'}
         w={'100%'}
         bg={useColorModeValue('white', 'gray.900')}
         boxShadow={'xl'}
         rounded={'lg'}
         p={6}
         textAlign={'center'}
      >
         <Avatar size={'xl'} alt={'Avatar Alt'} mb={4} pos={'relative'} />
         <Heading fontSize={'2xl'} fontFamily={'body'}>
            {`${userProfile.profile?.firstName} ${userProfile.profile?.lastName}`}
         </Heading>
         <Text fontWeight={600} color={'gray.500'} mb={4}>
            @{userProfile.role?.name}
         </Text>
         <Text
            textAlign={'center'}
            color={useColorModeValue('gray.700', 'gray.400')}
            px={3}
         >
            Actress, musician, songwriter and artist. PM for work inquires or{' '}
            <Link href={'#'} color={'blue.400'}>
               #tag
            </Link>{' '}
            me in your posts
         </Text>

         <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
            <Badge
               px={2}
               py={1}
               bg={useColorModeValue('gray.50', 'gray.800')}
               fontWeight={'400'}
            >
               #art
            </Badge>
            <Badge
               px={2}
               py={1}
               bg={useColorModeValue('gray.50', 'gray.800')}
               fontWeight={'400'}
            >
               #photography
            </Badge>
            <Badge
               px={2}
               py={1}
               bg={useColorModeValue('gray.50', 'gray.800')}
               fontWeight={'400'}
            >
               #music
            </Badge>
         </Stack>

         <Stack mt={8} direction={'row'} spacing={4}>
            <Button
               flex={1}
               fontSize={'sm'}
               rounded={'full'}
               _focus={{
                  bg: 'gray.200',
               }}
            >
               Message
            </Button>
            <Button
               flex={1}
               fontSize={'sm'}
               rounded={'full'}
               bg={'blue.400'}
               color={'white'}
               boxShadow={
                  '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
               }
               _hover={{
                  bg: 'blue.500',
               }}
               _focus={{
                  bg: 'blue.500',
               }}
            >
               Follow
            </Button>
         </Stack>
      </Box>
   );
}

export default UserInfo;
