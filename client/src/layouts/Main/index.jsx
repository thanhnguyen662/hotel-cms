import {
   Box,
   Drawer,
   DrawerContent,
   useColorModeValue,
   useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderBar from '../../components/HeaderBar';
import SiderBar from '../../components/SiderBar';

function Main() {
   const { isOpen, onOpen, onClose } = useDisclosure();

   return (
      <div>
         <Box minH='100vh' bg={useColorModeValue('gray.100', 'gray.900')}>
            <SiderBar
               onClose={() => onClose}
               display={{ base: 'none', md: 'block' }}
            />
            <Drawer
               autoFocus={false}
               isOpen={isOpen}
               placement='left'
               onClose={onClose}
               returnFocusOnClose={false}
               onOverlayClick={onClose}
               size='full'
            >
               <DrawerContent>
                  <SiderBar onClose={onClose} />
               </DrawerContent>
            </Drawer>
            <HeaderBar onOpen={onOpen} />
            <Box
               ml={{ base: 0, md: 60 }}
               px='10'
               py='4'
               bg='white'
               height='89vh'
            >
               <Outlet />
            </Box>
         </Box>
      </div>
   );
}

export default Main;
