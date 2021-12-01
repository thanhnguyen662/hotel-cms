import { SearchIcon } from '@chakra-ui/icons';
import {
   Avatar,
   Box,
   Button,
   Flex,
   Heading,
   HStack,
   IconButton,
   Input,
   InputGroup,
   InputLeftElement,
   Menu,
   MenuButton,
   MenuDivider,
   MenuItem,
   MenuList,
   Spacer,
   Stack,
   Text,
   useColorModeValue,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FiChevronDown, FiMenu } from 'react-icons/fi';
import { useNavigate } from 'react-router';

function HeaderBar({ onOpen, ...rest }) {
   const [isLogin] = useState(true);
   const navigate = useNavigate();

   const isLoginHeader = () => {
      return (
         <>
            <Flex
               ml={{ base: 0, md: 60 }}
               px={{ base: 4, md: 4 }}
               height='20'
               alignItems='center'
               borderBottomWidth='1px'
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

               <InputGroup mr='6'>
                  <InputLeftElement
                     pointerEvents='none'
                     children={<SearchIcon color='gray.300' />}
                  />
                  <Input
                     type='text'
                     placeholder='Search here...'
                     fontSize='0.8em'
                  />
               </InputGroup>

               <Box>
                  <HStack spacing={{ base: '0', md: '6' }}>
                     <Flex alignItems={'center'}>
                        <Menu>
                           <MenuButton
                              py={2}
                              transition='all 0.3s'
                              _focus={{ boxShadow: 'none' }}
                           >
                              <HStack>
                                 <Avatar
                                    size={'sm'}
                                    src={
                                       'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                                    }
                                 />
                                 <Box display={{ base: 'none', md: 'flex' }}>
                                    <FiChevronDown />
                                 </Box>
                              </HStack>
                           </MenuButton>
                           <MenuList>
                              <MenuItem>Profile</MenuItem>
                              <MenuItem>Settings</MenuItem>
                              <MenuItem>Billing</MenuItem>
                              <MenuDivider />
                              <MenuItem>Sign out</MenuItem>
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
         borderBottomWidth='1px'
         borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
         justifyContent={{ base: 'space-between', md: 'flex-end' }}
         {...rest}
      >
         <Box p='5'>
            <HStack>
               <Heading fontSize='xl'>Hi, Thanh Nguyen </Heading>
               <Text>✌</Text>
            </HStack>
         </Box>
         <Spacer />
         <Box>
            {isLogin ? <>{isLoginHeader()}</> : <>{isNotLoginHeader()}</>}
         </Box>
      </Flex>
   );
}

export default HeaderBar;
