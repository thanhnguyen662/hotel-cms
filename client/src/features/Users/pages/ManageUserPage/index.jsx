import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';
import {
   Avatar,
   Box,
   Button,
   Heading,
   HStack,
   Input,
   InputGroup,
   InputLeftElement,
   Menu,
   MenuButton,
   MenuItem,
   MenuList,
   Select,
   Text,
   VStack,
} from '@chakra-ui/react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import userApi from '../../../../api/userApi';
import ManageTable from '../../../../components/ManageTable';

function ManageUserPage(props) {
   const timeout = useRef(null);
   const currentUserRole = useSelector((state) => state.user.role);
   const [allUser, setAllUser] = useState([]);
   const [searchKeyword, setSearchKeyword] = useState({
      username: undefined,
      role: 'all',
   });

   let location = useLocation();
   let [searchParams, setSearchParams] = useSearchParams();
   console.log('searchParams: ', searchParams.get('user'));

   useEffect(() => {
      const getAllUserAccount = async () => {
         const response = await userApi.manageAllUser(searchKeyword);
         setAllUser(response);
      };
      getAllUserAccount();
   }, [searchKeyword, location]);

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
         Cell: (record) => {
            return (
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
                        <Link
                           to={`/users/manage/edit/${record.row.values.id}`}
                           state={{ backgroundLocation: location }}
                        >
                           <MenuItem>Edit</MenuItem>
                        </Link>
                        <Link
                           to={`/users/manage/delete/${record.row.values.id}`}
                           state={{ backgroundLocation: location }}
                        >
                           <MenuItem>Delete</MenuItem>
                        </Link>
                     </MenuList>
                  </Menu>
               </>
            );
         },
      });
   }

   const handleOnSearchChange = (value, key) => {
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
         setSearchKeyword({ ...searchKeyword, [key]: value });
      }, 400);
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
      </Box>
   );
}

export default ManageUserPage;
