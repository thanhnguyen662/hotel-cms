import { Box, Stack, useToast } from '@chakra-ui/react';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import sc from 'states-cities-db';
import orderApi from '../../../../api/orderApi';
import userApi from '../../../../api/userApi';
import OrderInformationForm from '../../components/OrderInformationForm';
import OrderPrice from '../../components/OrderPrice';

function OrderPage(props) {
   let { state } = useLocation();
   const toast = useToast();
   const navigate = useNavigate();
   const currentUserId = useSelector((state) => state.user.id);
   const [orderDuration, setOrderDuration] = useState(state?.duration || 0);
   const [totalOrderPrice, setTotalOrderPrice] = useState(
      state?.totalPrice || 0,
   );
   const [rangeOrderDate, setRangeOrderDate] = useState(
      state?.rangeDate || [moment().toDate(), moment().add(1, 'hour').toDate()],
   );
   const [selectAddCustomerRoom, setSelectAddCustomerRoom] = useState(0);
   const [customerOrderRoom, setCustomerOrderRoom] = useState([]);
   // const [prepareData, setPrepareData] = useState(state?.data);

   useEffect(() => {
      const startDate = moment(rangeOrderDate[0]);
      const endDate = moment(rangeOrderDate[1]);
      const durationHours = endDate.diff(startDate, 'hours');
      setOrderDuration(durationHours);
   }, [rangeOrderDate]);

   useEffect(() => {
      const calculator = state?.data.reduce((total, item) => {
         const pricePerHour = item.roomDetail.price / 24;
         const pricePerRow = pricePerHour * orderDuration;
         return (total += pricePerRow);
      }, 0);
      setTotalOrderPrice(calculator);
   }, [orderDuration, state?.data]);

   const handleChangeOrderDate = (value) => {
      setRangeOrderDate(value);
   };

   const countryOptions = sc.getCountries().map(({ name, prefix, iso }) => ({
      country: name,
      prefix: prefix,
      iso: iso,
   }));

   const handleSubmitOrder = async () => {
      try {
         const response = await orderApi.createOrder({
            customerOrderRoom,
            orderDuration,
            totalOrderPrice,
            roomData: state?.data,
            receptionistId: currentUserId,
            rangeOrderDate,
         });
         if (response.message === 'create_order_success') navigate('/checkout');
      } catch (error) {
         console.log(error);
      }
   };

   const handleSelectAddCustomerRoom = (roomId) => {
      setSelectAddCustomerRoom(roomId);
   };

   const handleAddCustomerToRoom = async (customerInfo, resetForm) => {
      try {
         const response = await userApi.customerProfile(customerInfo);

         if (customerOrderRoom?.some((i) => i.customerId === response.id)) {
            return toast({
               title: 'Error.',
               description: 'Cannot add same user to order.',
               status: 'error',
               duration: 9000,
               isClosable: true,
            });
         }

         resetForm();
         setCustomerOrderRoom((prev) => {
            prev.push({
               roomId: selectAddCustomerRoom,
               customerId: response.id,
               lastName: response.lastName,
               idCard: response.idCard,
            });
            return [...prev];
         });
      } catch (error) {
         console.log(error);
      }
   };

   const handleDeleteCustomerToRoom = (idCard) => {
      setCustomerOrderRoom((prev) => {
         return prev.filter((i) => i.idCard !== idCard);
      });
   };

   return (
      <>
         <Stack direction={['column', 'row']} spacing='24px'>
            <Box flex='5'>
               <OrderPrice
                  rangeOrderDate={rangeOrderDate}
                  defaultDate={state?.rangeDate}
                  defaultData={state?.data}
                  handleChangeOrderDate={handleChangeOrderDate}
                  orderDuration={orderDuration}
                  totalOrderPrice={totalOrderPrice}
                  handleSelectAddCustomerRoom={handleSelectAddCustomerRoom}
                  customerOrderRoom={customerOrderRoom}
                  handleDeleteCustomerToRoom={handleDeleteCustomerToRoom}
               />
            </Box>
            <Box flex='4'>
               <OrderInformationForm
                  countryOptions={countryOptions}
                  handleSubmitOrder={handleSubmitOrder}
                  handleAddCustomerToRoom={handleAddCustomerToRoom}
                  selectAddCustomerRoom={selectAddCustomerRoom}
                  customerOrderRoom={customerOrderRoom}
                  defaultData={state?.data}
               />
            </Box>
         </Stack>
      </>
   );
}

export default OrderPage;
