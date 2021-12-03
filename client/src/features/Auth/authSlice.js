import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';

export const getUserProfile = createAsyncThunk('user/profile', async () => {
   const response = await userApi.my();
   console.log('current user: ', response);

   return response;
});

const authUser = createSlice({
   name: 'user',
   initialState: {
      id: '',
      username: '',
      firstName: '',
      lastName: '',
      loginStatus: false,
      role: '',
   },
   reducers: {},
   extraReducers: {
      [getUserProfile.fulfilled]: (state, action) => {
         state.id = action.payload.id;
         state.username = action.payload.username;
         state.firstName = action.payload.profile?.firstName;
         state.lastName = action.payload.profile?.lastName;
         state.loginStatus = action.payload.loginStatus;
         state.role = action.payload.role?.name;
      },
   },
});

const { reducer, actions } = authUser;
export const { userInfo } = actions;
export default reducer;
