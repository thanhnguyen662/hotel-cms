import {
   Box,
   CloseButton,
   Flex,
   Icon,
   Link,
   Text,
   useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import {
   FiCompass,
   FiHome,
   FiSettings,
   FiStar,
   FiTrendingUp,
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const LinkItems = [
   { name: 'Home', icon: FiHome, navigateTo: '/' },
   { name: 'Manage User', icon: FiTrendingUp, navigateTo: '/manages/user' },
   { name: 'Explore', icon: FiCompass, navigateTo: '/' },
   { name: 'Favourites', icon: FiStar, navigateTo: '/' },
   { name: 'Settings', icon: FiSettings, navigateTo: '/' },
];

const NavItem = ({ icon, children, navigateTo, ...rest }) => {
   const navigate = useNavigate();
   const onClickSidebarTab = () => {
      navigate(navigateTo);
   };

   return (
      <Link onClick={onClickSidebarTab} style={{ textDecoration: 'none' }}>
         <Flex
            align='center'
            p='4'
            mx='4'
            borderRadius='lg'
            role='group'
            cursor='pointer'
            _hover={{
               bg: 'cyan.400',
               color: 'white',
            }}
            {...rest}
         >
            {icon && (
               <Icon
                  mr='4'
                  fontSize='16'
                  _groupHover={{
                     color: 'white',
                  }}
                  as={icon}
               />
            )}
            {children}
         </Flex>
      </Link>
   );
};

function SiderBar({ onClose, ...rest }) {
   return (
      <Box
         transition='3s ease'
         bg={useColorModeValue('white', 'gray.900')}
         borderRight='1px'
         borderRightColor={useColorModeValue('gray.200', 'gray.700')}
         w={{ base: 'full', md: 60 }}
         pos='fixed'
         h='full'
         {...rest}
      >
         <Flex h='20' alignItems='center' mx='8' justifyContent='space-between'>
            <Text fontSize='2xl' fontFamily='monospace' fontWeight='bold'>
               Logo
            </Text>
            <CloseButton
               display={{ base: 'flex', md: 'none' }}
               onClick={onClose}
            />
         </Flex>
         {LinkItems.map((link) => (
            <NavItem
               key={link.name}
               icon={link.icon}
               navigateTo={link.navigateTo}
            >
               {link.name}
            </NavItem>
         ))}
      </Box>
   );
}

export default SiderBar;
