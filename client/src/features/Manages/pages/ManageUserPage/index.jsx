import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import userApi from '../../../../api/userApi';
import ManageTable from '../../../../components/ManageTable';
import {
   Avatar,
   Button,
   Input,
   InputGroup,
   InputLeftElement,
   Box,
   Heading,
   HStack,
   VStack,
   Select,
   useDisclosure,
   Text,
   Menu,
   MenuButton,
   MenuList,
   MenuItem,
   useToast,
} from '@chakra-ui/react';
import EditProfileModal from '../../components/EditProfileModel';

function ManageUserPage(props) {
   const toast = useToast();
   const timeout = useRef(null);
   const { onOpen, isOpen, onClose } = useDisclosure();
   const currentUserRole = useSelector((state) => state.user.role);
   const [rowValues, setRowValues] = useState({});
   const [allUser, setAllUser] = useState([]);
   const [searchKeyword, setSearchKeyword] = useState({
      username: undefined,
      role: 'all',
   });

   useEffect(() => {
      const getAllUserAccount = async () => {
         const response = await userApi.manageAllUser(searchKeyword);
         setAllUser(response);
      };
      getAllUserAccount();
   }, [searchKeyword]);

   const data = useMemo(() => [...allUser], [allUser]);
   const columns = useMemo(
      () => [
         {
            Header: 'Avatar',
            Cell: (record) => <Avatar name={record.row.values.username} />,
         },
         {
            Header: 'Username',
            accessor: 'username',
         },
         {
            Header: 'First Name',
            accessor: 'profile.firstName',
         },
         {
            Header: 'Last Name',
            accessor: 'profile.lastName',
         },
         {
            Header: 'Role',
            accessor: 'role.name',
         },
      ],
      // eslint-disable-next-line
      [currentUserRole],
   );

   if (currentUserRole === 'admin') {
      columns.push({
         Header: 'Actions',
         accessor: 'id',
         Cell: (record) => (
            <>
               <Menu>
                  <MenuButton
                     as={Button}
                     rightIcon={<ChevronDownIcon />}
                     colorScheme='blue'
                  >
                     Actions
                  </MenuButton>
                  <MenuList>
                     <MenuItem onClick={() => onClickEdit(record)}>
                        Edit
                     </MenuItem>
                     <MenuItem>Delete</MenuItem>
                  </MenuList>
               </Menu>
            </>
         ),
      });
   }

   const handleOnSearchChange = (value, key) => {
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
         setSearchKeyword({ ...searchKeyword, [key]: value });
      }, 400);
   };

   const onClickEdit = (record) => {
      setRowValues(record.row.values);
      onOpen();
   };

   const handleEditUser = async (formData) => {
      try {
         const response = await userApi.editProfile(formData);
         setAllUser((prev) => {
            const findIndex = prev.findIndex((i) => i.id === response.id);
            prev[findIndex] = { ...response };
            return [...prev];
         });
         showToastNotification(
            'Successful',
            `Edit ${response.username} Success`,
            'success',
         );
         onClose();
      } catch (error) {
         console.log(error);
      }
   };

   const handleResetPassword = async (userId) => {
      try {
         const response = await userApi.resetPassword({ userId });
         if (response.message === 'reset_password_success') {
            showToastNotification(
               'Successful',
               `Reset Password of ${response.username} success`,
               'success',
            );
            onClose();
         }
      } catch (error) {
         console.log(error);
      }
   };

   const showToastNotification = (title, description, status) => {
      toast({
         title: title,
         description: description,
         status: status,
         duration: 9000,
         isClosable: true,
      });
   };

   return (
      <Box bg='white' boxShadow='xl' rounded='xl' p='5'>
         <Heading fontSize='25' mb='2'>
            Manage User
         </Heading>
         <Text mb='6'>
            Ad ullamco magna eu proident dolor commodo sunt veniam.
         </Text>
         <VStack spacing='5'>
            <HStack spacing='5' width='full'>
               <Select
                  placeholder='Select option'
                  flex='1'
                  defaultValue='all'
                  onChange={(e) => handleOnSearchChange(e.target.value, 'role')}
               >
                  <option value='all'>All</option>
                  <option value='admin'>Admin</option>
                  <option value='user'>User</option>
               </Select>
               <InputGroup flex='2'>
                  <InputLeftElement
                     pointerEvents='none'
                     children={<SearchIcon color='gray.300' />}
                  />
                  <Input
                     placeholder='Search by username'
                     onChange={(e) =>
                        handleOnSearchChange(e.target.value, 'username')
                     }
                  />
               </InputGroup>
            </HStack>
            <ManageTable data={data} columns={columns} />
         </VStack>

         <EditProfileModal
            isOpen={isOpen}
            onClose={onClose}
            rowValues={rowValues}
            onSubmit={handleEditUser}
            onResetPassword={handleResetPassword}
         />
      </Box>
   );
}

export default ManageUserPage;
