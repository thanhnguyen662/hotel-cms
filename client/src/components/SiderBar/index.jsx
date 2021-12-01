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

const LinkItems = [
   { name: 'Home', icon: FiHome },
   { name: 'Trending', icon: FiTrendingUp },
   { name: 'Explore', icon: FiCompass },
   { name: 'Favourites', icon: FiStar },
   { name: 'Settings', icon: FiSettings },
];

const NavItem = ({ icon, children, ...rest }) => {
   return (
      <Link href='#' style={{ textDecoration: 'none' }}>
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
            <NavItem key={link.name} icon={link.icon}>
               {link.name}
            </NavItem>
         ))}
      </Box>
   );
}

export default SiderBar;
