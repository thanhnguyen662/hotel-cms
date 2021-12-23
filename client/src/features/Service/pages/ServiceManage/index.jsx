import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
   Box,
   Heading,
   Stack,
   Text,
   HStack,
   VStack,
   InputGroup,
   InputLeftElement,
   Input,
   Select,
   Button,
   useDisclosure,
   Image,
   Menu,
   MenuButton,
   MenuItem,
   MenuList,
   useToast,
} from '@chakra-ui/react';
import { ChevronDownIcon, SearchIcon, AddIcon } from '@chakra-ui/icons';
import ServiceModal from '../../components/Modal';
import ManageTable from '../../../../components/ManageTable';
import serviceApi from '../../../../api/serviceApi';
import AlertDialogBox from '../../../../components/AlertDialogBox';

function ServiceManage(props) {
   //STATE
   const { isOpen, onOpen, onClose } = useDisclosure();
   const [modalData, setModalData] = useState({});
   const [allService, setAllService] = useState([
      {
         name: '',
         type: '',
         price: 0,
         image: '',
      },
   ]);
   const [target, setTarget] = useState({
      id: 0,
      name: '',
      type: '',
      price: 0,
      image: '',
   });
   const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
   const toast = useToast();
   const [searchKeyword, setSearchKeyword] = useState({
      name: undefined,
      type: 'all',
   });

   //REF
   const timeout = useRef(null);

   //EFFECT
   useEffect(() => {
      const getAllService = async () => {
         const getAllServiceRes = await serviceApi.getAllService(searchKeyword);
         setAllService(getAllServiceRes);
      };
      getAllService();
   }, [searchKeyword]);

   //MEMO
   const data = useMemo(() => [...allService], [allService]);
   const columns = useMemo(
      () => [
         {
            Header: 'Image',
            accessor: 'image',
            Cell: (record) => (
               <Image
                  src={record.row.values.image}
                  alt='Service'
                  boxSize='140px'
                  fit='cover'
                  borderRadius='7px'
               />
            ),
         },
         {
            Header: 'Name',
            accessor: 'name',
         },
         {
            Header: 'Price($)',
            accessor: 'price',
         },
         {
            Header: 'Type',
            accessor: 'type',
         },
         {
            Header: 'Actions',
            accessor: 'id',
            Cell: (record) => (
               <>
                  <Menu>
                     <MenuButton
                        as={Button}
                        rightIcon={<ChevronDownIcon />}
                        colorScheme='blue'
                        onClick={() => setTarget(record.row.values)}
                     >
                        Actions
                     </MenuButton>
                     <MenuList>
                        <MenuItem
                           onClick={() => {
                              onOpen();
                              setModalData({
                                 title: `Edit ${record.row.values.name}`,
                                 modalType: 'Edit',
                                 ...record.row.values,
                              });
                           }}
                        >
                           Edit
                        </MenuItem>
                        <MenuItem onClick={() => setIsDeleteAlertOpen(true)}>
                           Delete
                        </MenuItem>
                     </MenuList>
                  </Menu>
               </>
            ),
         },
      ],
      // eslint-disable-next-line
      [],
   );

   //FUNCTION
   const showToastNotification = (title, description, status) => {
      toast({
         title: title,
         description: description,
         status: status,
         duration: 2000,
         isClosable: true,
      });
   };
   //Delete
   const handleOnDelete = async () => {
      const deleteServiceRes = await serviceApi.deleteFood({ id: target.id });
      if (deleteServiceRes.message === 'OK') {
         setAllService(allService.filter((i) => i.id !== target.id));
         return showToastNotification(
            'Successful',
            `Delete ${target.name} success`,
            'success',
         );
      }
   };
   //Add
   const handleAdd = (foodItem) => {
      setAllService([foodItem, ...allService]);
      onClose();
      return showToastNotification(
         'Successful',
         `Add ${foodItem.name} success`,
         'success',
      );
   };

   //Edit
   const handleEdit = (data) => {
      setAllService((prev) => {
         return [data, ...prev.filter((i) => i.id !== target.id)];
      });
      onClose();
      return showToastNotification(
         'Successful',
         `Edit ${data.name} success`,
         'success',
      );
   };
   //search
   const handleOnSearchChange = (value, key) => {
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
         setSearchKeyword({ ...searchKeyword, [key]: value });
      }, 400);
   };
   return (
      <Stack direction={['column', 'row']} spacing='24px' minH='82vh'>
         <Box flex='1' bg='white' boxShadow='xl' rounded='lg' p='5'>
            <Heading fontSize='25' mb='2'>
               Manage Services
            </Heading>
            <Text mb='6'>Manage all existing services in the hotel</Text>
            <VStack spacing='5'>
               <HStack spacing='5' width='full'>
                  <Select
                     placeholder='Select option'
                     flex='1'
                     defaultValue='all'
                     onChange={(e) =>
                        handleOnSearchChange(e.target.value, 'type')
                     }
                  >
                     <option value='all'>All</option>
                     <option value='Entertainment'>Entertainment</option>
                     <option value='Spa'>Spa</option>
                     <option value='Sport'>Sport</option>
                     <option value='Food'>Food</option>
                  </Select>
                  <InputGroup flex='2'>
                     <InputLeftElement
                        pointerEvents='none'
                        children={<SearchIcon color='gray.300' />}
                     />
                     <Input
                        placeholder='Search by service name'
                        onChange={(e) =>
                           handleOnSearchChange(e.target.value, 'name')
                        }
                     />
                  </InputGroup>
                  <Button
                     leftIcon={<AddIcon />}
                     colorScheme='green'
                     variant='solid'
                     px='20px'
                     onClick={() => {
                        onOpen();
                        setModalData({
                           title: 'Add new service',
                           modalType: 'Add',
                        });
                     }}
                  >
                     Add
                  </Button>
               </HStack>
               <ManageTable data={data} columns={columns} />
            </VStack>
         </Box>
         <ServiceModal
            isOpen={isOpen}
            modalData={modalData}
            onClose={onClose}
            handleAdd={handleAdd}
            handleEdit={handleEdit}
         />
         <AlertDialogBox
            isDeleteAlertOpen={isDeleteAlertOpen}
            setIsDeleteAlertOpen={setIsDeleteAlertOpen}
            handleOnDelete={handleOnDelete}
         />
      </Stack>
   );
}

export default ServiceManage;
