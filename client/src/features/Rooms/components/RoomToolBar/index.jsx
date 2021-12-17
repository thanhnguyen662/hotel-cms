import React from 'react';
import { Select } from '@chakra-ui/react';
// import PropTypes from 'prop-types';

RoomToolBar.propTypes = {};

function RoomToolBar(props) {
   const { handleChangeSearchValue, searchData } = props;

   const onChangeSelectRoomType = (e) => {
      handleChangeSearchValue('roomType', e.target.value);
   };

   return (
      <>
         <Select
            placeholder='Select option'
            value={searchData.roomType}
            onChange={onChangeSelectRoomType}
         >
            <option value='all'>All</option>
            <option value='single'>Single</option>
            <option value='double'>Double</option>
            <option value='vip'>Vip</option>
         </Select>
      </>
   );
}

export default RoomToolBar;
