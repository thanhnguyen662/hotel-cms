import { Avatar } from '@chakra-ui/avatar';
import { Button } from '@chakra-ui/button';
import { SearchIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input';
import { Box, Heading, HStack, VStack } from '@chakra-ui/layout';
import { Select } from '@chakra-ui/select';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import userApi from '../../../../api/userApi';
import ManageTable from '../../../../components/ManageTable';

function ManageUserPage(props) {
   const timeout = useRef(null);
   const [allUser, setAllUser] = useState([]);
   const [searchKeyword, setSearchKeyword] = useState({
      username: undefined,
      role: 'all',
   });
   const currentUserRole = useSelector((state) => state.user.role);

   useEffect(() => {
      const getAllUserAccount = async () => {
         const response = await userApi.manageAllUser(searchKeyword);
         setAllUser(response);
      };
      getAllUserAccount();
   }, [searchKeyword]);

   const handleOnSearchChange = (value, searchType) => {
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
         setSearchKeyword({ ...searchKeyword, [searchType]: value });
      }, 400);
   };

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
         Header: 'Edit',
         accessor: 'id',
         Cell: (record) => (
            <Button onClick={() => console.log(record.value)}>edit</Button>
         ),
      });
   }

   return (
      <Box>
         <Heading fontSize='25' mb='6'>
            Manage User
         </Heading>
         <VStack spacing='5'>
            <HStack spacing='5' width='full'>
               <Select
                  placeholder='Select option'
                  flex='1'
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
