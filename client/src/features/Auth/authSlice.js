import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';

export const getUserProfile = createAsyncThunk('user/profile', async () => {
   const response = await userApi.my();
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
   },
   reducers: {},
   extraReducers: {
      [getUserProfile.fulfilled]: (state, action) => {
         const { id, username, firstName, lastName, loginStatus } =
            action.payload;
         state.id = id;
         state.username = username;
         state.firstName = firstName;
         state.lastName = lastName;
         state.loginStatus = loginStatus;
      },
   },
});

const { reducer, actions } = authUser;
export const { userInfo } = actions;
export default reducer;
