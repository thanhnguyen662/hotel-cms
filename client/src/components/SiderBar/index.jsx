import {
   Box,
   CloseButton,
   Flex,
   Icon,
   Link,
   Text,
   useColorModeValue,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {
   FiCompass,
   FiHome,
   FiInbox,
   FiSettings,
   FiTrendingUp,
} from 'react-icons/fi';
import { MdRoomService } from 'react-icons/md';
import { RiCalendarEventLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LinkItems = [
   { name: 'Home', icon: FiHome, navigateTo: '/' },
   { name: 'Manage User', icon: FiTrendingUp, navigateTo: '/users/manage' },
   {
      name: 'Room',
      icon: FiCompass,
      navigateTo: '/rooms/manage/101',
   },
   {
      name: 'Manage service',
      icon: FiSettings,
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
   {
      name: 'Housekeeper',
      icon: FiInbox,
      navigateTo: '/housekeeper/rooms',
   },
   {
      name: 'Checkout',
      icon: FiInbox,
      navigateTo: '/checkout',
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
   //current user role
   const currentUserRole =
      useSelector((state) => state.user?.role) || 'anonymous';
   //STATE
   const [linkFilter, setLinkFilter] = useState([]);
   //EFFECT
   useEffect(() => {
      currentUserRole === 'admin' &&
         setLinkFilter(LinkItems.filter((item) => item.name === 'Manage User'));
      currentUserRole === 'receptionist' &&
         setLinkFilter(
            LinkItems.filter(
               (item) =>
                  item.name === 'Room' ||
                  item.name === 'Housekeeper' ||
                  item.name === 'Checkout',
            ),
         );
      currentUserRole === 'serviceMg' &&
         setLinkFilter(
            LinkItems.filter(
               (item) =>
                  item.name === 'Manage service' ||
                  item.name === 'Order service',
            ),
         );
      currentUserRole === 'eventMg' &&
         setLinkFilter(
            LinkItems.filter((item) => item.name === 'Manage event'),
         );

      currentUserRole === 'housekeeper' &&
         setLinkFilter(LinkItems.filter((item) => item.name === 'Housekeeper'));
   }, [currentUserRole]);

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
         {linkFilter?.map((link) => (
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
