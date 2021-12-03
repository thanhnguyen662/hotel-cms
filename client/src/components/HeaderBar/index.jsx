import { SearchIcon } from '@chakra-ui/icons';
import {
   Avatar,
   Box,
   Button,
   Flex,
   HStack,
   IconButton,
   Input,
   InputGroup,
   InputRightElement,
   Menu,
   MenuButton,
   MenuDivider,
   MenuItem,
   MenuList,
   Spacer,
   Stack,
   useColorModeValue,
   VStack,
   Text,
} from '@chakra-ui/react';
import React from 'react';
import { FiChevronDown, FiMenu } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import userApi from '../../api/userApi';

function HeaderBar({ onOpen, ...rest }) {
   const navigate = useNavigate();
   const loginStatus = useSelector((state) => state.user.loginStatus);
   const currentUserId = useSelector((state) => state.user.id);
   const username = useSelector((state) => state.user.username);
   const role = useSelector((state) => state.user.role);
   const firstName = useSelector((state) => state.user.firstName);
   const lastName = useSelector((state) => state.user.lastName);

   const onLogoutClick = async () => {
      try {
         const response = await userApi.logout();
         if (response.message === 'logout_success')
            return (window.location = '/');
      } catch (error) {
         console.log(error);
      }
   };

   const onProfileClick = () => {
      return navigate(`/profile/${currentUserId}`);
   };

   const isLoginHeader = () => {
      return (
         <>
            <Flex
               ml={{ base: 0, md: 60 }}
               px={{ base: 4, md: 4 }}
               height='20'
               alignItems='center'
               // borderBottomWidth='1px'
               justifyContent={{ base: 'space-between', md: 'flex-end' }}
               {...rest}
            >
               <IconButton
                  display={{ base: 'flex', md: 'none' }}
                  onClick={onOpen}
                  variant='outline'
                  aria-label='open menu'
                  icon={<FiMenu />}
               />

               <Box ml='4'>
                  <HStack spacing={{ base: '0', md: '6' }}>
                     <Flex alignItems={'center'}>
                        <Menu>
                           <MenuButton
                              py={2}
                              transition='all 0.3s'
                              _focus={{ boxShadow: 'none' }}
                           >
                              <HStack>
                                 <VStack
                                    display={{ base: 'none', md: 'flex' }}
                                    alignItems='flex-start'
                                    spacing='1px'
                                    mr='3'
                                 >
                                    <Text fontSize='sm'>{`${firstName} ${lastName}`}</Text>
                                    <Text fontSize='xs' color='gray.600'>
                                       {role}
                                    </Text>
                                 </VStack>
                                 <Avatar size={'md'} name={username} />
                                 <Box display={{ base: 'none', md: 'flex' }}>
                                    <FiChevronDown />
                                 </Box>
                              </HStack>
                           </MenuButton>
                           <MenuList>
                              <MenuItem onClick={onProfileClick}>
                                 Profile
                              </MenuItem>
                              <MenuItem>Settings</MenuItem>
                              <MenuItem>Billing</MenuItem>
                              <MenuDivider />
                              <MenuItem onClick={onLogoutClick}>
                                 Sign out
                              </MenuItem>
                           </MenuList>
                        </Menu>
                     </Flex>
                  </HStack>
               </Box>
            </Flex>
         </>
      );
   };

   const isNotLoginHeader = () => {
      return (
         <>
            <Stack
               flex={{ base: 1, md: 0 }}
               justify={'flex-end'}
               direction={'row'}
               spacing={6}
            >
               <Button
                  as={'a'}
                  fontSize={'sm'}
                  fontWeight={400}
                  variant={'link'}
                  onClick={() => navigate('/account/login')}
               >
                  Sign In
               </Button>
               <Button
                  display={{ base: 'none', md: 'inline-flex' }}
                  fontSize={'sm'}
                  fontWeight={600}
                  color={'white'}
                  bg={'pink.400'}
                  _hover={{
                     bg: 'pink.300',
                  }}
                  onClick={() => navigate('/account/register')}
               >
                  Sign Up
               </Button>
            </Stack>
         </>
      );
   };

   return (
      <Flex
         ml={{ base: 0, md: 60 }}
         px={{ base: 4, md: 4 }}
         height='20'
         alignItems='center'
         bg={useColorModeValue('white', 'gray.900')}
         // borderBottomWidth='1px'
         borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
         justifyContent={{ base: 'space-between', md: 'flex-end' }}
         {...rest}
      >
         <Box p='5'>
            <InputGroup display={{ base: 'none', md: 'flex' }}>
               <InputRightElement
                  pointerEvents='none'
                  children={<SearchIcon color='gray.400' />}
               />
               <Input
                  type='text'
                  placeholder='Search here...'
                  fontSize='0.8em'
                  bg='gray.100'
                  width='20vw'
               />
            </InputGroup>
         </Box>
         <Spacer />
         <Box>
            {loginStatus ? <>{isLoginHeader()}</> : <>{isNotLoginHeader()}</>}
         </Box>
      </Flex>
   );
}

export default HeaderBar;
