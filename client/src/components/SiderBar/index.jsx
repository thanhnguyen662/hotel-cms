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
import {
   MdRestaurantMenu,
   MdRoomService,
   MdOutlineEventNote,
} from 'react-icons/md';
import { GrServices } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import { RiCalendarEventLine } from 'react-icons/ri';

const LinkItems = [
   { name: 'Home', icon: FiHome, navigateTo: '/' },
   { name: 'Manage User', icon: FiTrendingUp, navigateTo: '/users/manage' },
   {
      name: 'Room',
      icon: FiCompass,
      navigateTo: '/rooms/manage?selectedRoomArr=%255B101%255D',
   },
   { name: 'Favourites', icon: FiStar, navigateTo: '/' },
   { name: 'Settings', icon: FiSettings, navigateTo: '/' },
   {
      name: 'Manage service',
      icon: GrServices,
      navigateTo: 'service/manage',
   },
   {
      name: 'Order service',
      icon: MdRoomService,
      navigateTo: 'service/order',
   },
   {
      name: 'Manage event',
      icon: RiCalendarEventLine,
      navigateTo: 'event/manage',
   },
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
            mx='2'
            borderRadius='lg'
            role='group'
            cursor='pointer'
            fontSize='sm'
            color='whiteAlpha.700'
            _hover={{
               bg: 'blackAlpha.300',
               color: 'whiteAlpha.900',
            }}
            fontWeight='600'
            transition='.15s ease'
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
         bg={useColorModeValue('#3C4178', 'gray.900')}
         borderRight='1px'
         borderRightColor={useColorModeValue('gray.200', 'gray.700')}
         w={{ base: 'full', md: 60 }}
         pos='fixed'
         h='full'
         {...rest}
      >
         <Flex h='20' alignItems='center' mx='6' justifyContent='space-between'>
            {/* <Text fontSize='2xl' fontFamily='monospace' fontWeight='bold'>
               Logo
            </Text> */}
            <Flex px='0' py='5' align='center'>
               <Text fontSize='2xl' ml='2' color='white' fontWeight='semibold'>
                  Hotel CMS
               </Text>
            </Flex>
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
