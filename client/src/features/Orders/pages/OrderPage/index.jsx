import { Box } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import Flatpickr from 'react-flatpickr';
import { useLocation } from 'react-router-dom';
import ManageTable from '../../../../components/ManageTable';
import priceFormat from '../../../../utils/PriceFormat';

function OrderPage(props) {
   let { state } = useLocation();

   const data = useMemo(() => [...state.data], [state.data]);
   const columns = useMemo(
      () => [
         {
            Header: 'Room',
            accessor: 'number',
         },
         {
            Header: 'Price',
            accessor: 'roomDetail.price',
            Cell: (record) => {
               return (
                  <Box>
                     {priceFormat(record.row.values['roomDetail.price'])}
                     <Box as='span' color='gray.600' fontSize='sm'>
                        / day
                     </Box>
                  </Box>
               );
            },
         },
         {
            Header: 'Total',
            Cell: (record) => {
               const pricePerHours = record.row.values['roomDetail.price'] / 24;
               const pricePerRow = pricePerHours * state.duration;
               return (
                  <>
                     <Box>{priceFormat(pricePerRow)}</Box>
                  </>
               );
            },
         },
      ],
      [state.duration],
   );

   return (
      <>
         <Box>
            <Flatpickr
               id='startDate'
               style={{
                  height: '100%',
                  borderRadius: '8px',
                  padding: '9.5px 5px',
                  width: '100%',
               }}
               options={{
                  enableTime: true,
                  mode: 'range',
                  defaultDate: state?.rangeDate,
               }}
            />
         </Box>
         <ManageTable data={data} columns={columns} />
      </>
   );
}

export default OrderPage;
