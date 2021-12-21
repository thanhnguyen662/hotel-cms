import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { chakra, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';
import { useSortBy, useTable } from 'react-table';

ManageTable.propTypes = {
   rawData: PropTypes.array,
   rawColumns: PropTypes.array,
};

ManageTable.defaultProps = {
   rawData: [],
   rawColumns: [],
};

function ManageTable(props) {
   const { data, columns } = props;

   const tableInstance = useTable({ columns, data }, useSortBy);

   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      tableInstance;

   return (
      <>
         <Table {...getTableProps()} variant='simple'>
            <Thead>
               {headerGroups.map((headerGroup) => (
                  <Tr {...headerGroup.getHeaderGroupProps()}>
                     {headerGroup.headers.map((column) => (
                        <Th
                           {...column.getHeaderProps(
                              column.getSortByToggleProps(),
                           )}
                           isNumeric={column.isNumeric}
                        >
                           {column.render('Header')}
                           <chakra.span pl='4'>
                              {column.isSorted ? (
                                 column.isSortedDesc ? (
                                    <TriangleDownIcon aria-label='sorted descending' />
                                 ) : (
                                    <TriangleUpIcon aria-label='sorted ascending' />
                                 )
                              ) : null}
                           </chakra.span>
                        </Th>
                     ))}
                  </Tr>
               ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
               {rows.map((row) => {
                  prepareRow(row);
                  return (
                     <Tr {...row.getRowProps()}>
                        {row.cells.map((cell) => (
                           <Td
                              {...cell.getCellProps()}
                              isNumeric={cell.column.isNumeric}
                           >
                              {cell.render('Cell')}
                           </Td>
                        ))}
                     </Tr>
                  );
               })}
            </Tbody>

            {/* {footerGroups[0]?.getFooterGroupProps().length > 0 && (
               <Tfoot>
                  {footerGroups.map((group) => (
                     <Tr {...group.getFooterGroupProps()}>
                        {group.headers.map((column) => (
                           <Td {...column.getFooterProps()}>
                              {column.render('Footer')}
                           </Td>
                        ))}
                     </Tr>
                  ))}
               </Tfoot>
            )} */}
         </Table>
      </>
   );
}

export default ManageTable;
