import {
   Box,
   Button,
   Heading,
   Stack,
   Tag,
   Text,
   VStack,
   Select,
} from '@chakra-ui/react';
import React, { useEffect, useMemo } from 'react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import roomApi from '../../../../api/roomApi';
import ManageTable from '../../../../components/ManageTable';
import SearchRoomHouseKeeper from '../../components/SearchRoomHousekeeper';
import moment from 'moment';

function ManageRoomHousekeeperPage(props) {
   const [manageRoom, setManageRoom] = useState([]);
   let [searchParams, setSearchParams] = useSearchParams();
   let roomNumber = searchParams.get('roomNumber');
   let roomStatus = searchParams.get('roomStatus');

   useEffect(() => {
      const getAllRoom = async () => {
         try {
            const response = await roomApi.housekeeperManageRoom({
               roomNumber,
               roomStatus,
            });
            setManageRoom(response);
         } catch (error) {
            console.log(error);
         }
      };
      getAllRoom();
   }, [roomNumber, roomStatus]);

   const data = useMemo(() => [...manageRoom], [manageRoom]);
   const columns = useMemo(
      () => [
         {
            Header: 'Room',
            accessor: 'number',
         },
         {
            Header: 'Floor',
            accessor: 'floor',
         },
         {
            Header: 'Updated At',
            accessor: 'updateStatusdAt',
            Cell: (record) => {
               return (
                  <Text>
                     {moment(
                        record.row.original.statusOfRooms[0].updatedAt,
                     ).fromNow()}
                  </Text>
               );
            },
         },
         {
            Header: 'Status',
            accessor: 'statusOfRooms[0].roomStatus.code',
            Cell: (record) => {
               const check =
                  record.row.original.statusOfRooms[0].roomStatus.code;
               let color = () => {
                  if (check === 'VC') return 'teal';
                  if (check === 'VD') return 'red';
                  if (check === 'OD') return 'blue';
                  if (check === 'OD') return 'green';
               };
               let isColor = color();
               return (
                  <Tag variant='solid' colorScheme={isColor} size='lg'>
                     {check}
                  </Tag>
               );
            },
         },
         {
            Header: 'Action',
            accessor: 'statusOfRooms[0].roomStatus.status',
            Cell: (record) => {
               const value = record.row.original.statusOfRooms[0];
               return (
                  <Select
                     variant='outline'
                     defaultValue={value.roomStatus.code}
                     onChange={(e) =>
                        handleChangeRoomStatus(value.id, e.target.value)
                     }
                  >
                     <option value='VC'>Vacant & Clean</option>
                     <option value='VD'>Vacant & Dirty</option>
                     <option value='OC'>Occupied & Clean</option>
                     <option value='OD'>Occupied & Dirty</option>
                  </Select>
               );
            },
         },
      ],
      [],
   );

   const handleSearchRoom = (props) => {
      setSearchParams(props);
   };

   const handleChangeRoomStatus = async (statusOfRoomId, statusCode) => {
      try {
         const response = await roomApi.housekeeperUpdateStatusRoom({
            statusOfRoomId,
            statusCode,
         });

         if (response.message === 'updated_roomStatus_success') {
            setManageRoom((prev) => {
               const findIndex = prev.findIndex(
                  (i) => i.id === Number(response.room.id),
               );
               prev[findIndex].statusOfRooms = [{ ...response }];
               return [...prev];
            });
         }
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <>
         <Stack direction={['column', 'row']} spacing='24px' minH='82vh'>
            <Box flex='2' bg='white' boxShadow='xl' rounded='lg'>
               <VStack spacing='4' align='stretch' mx='7'>
                  <Box pt='6'>
                     <Heading fontSize='25'>Manage Room</Heading>
                     <Text fontSize='sm'>
                        Nisi ullamco sint anim ipsum est incididunt.
                     </Text>
                  </Box>
                  <SearchRoomHouseKeeper handleSearchRoom={handleSearchRoom} />
                  <Box>
                     <ManageTable data={data} columns={columns} />
                  </Box>
               </VStack>
            </Box>
         </Stack>
      </>
   );
}

export default ManageRoomHousekeeperPage;
