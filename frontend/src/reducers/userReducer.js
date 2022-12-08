import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/user';

const userToken = document.cookie ? userService.getToken('jwt') : null;

const initialState = {
  userInfo: {},
  userToken,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state, action) {
      document.cookie = 'jwt= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
      state.userInfo = null;
      state.userToken = null;
    },
    setToken(state, action) {
      state.userToken = action.payload;
    },
    setUser(state, action) {
      const user = action.payload;
      state.userInfo = {};
    },
    removeUser(state, action) {
      console.log('ACTION: LOGOUT', action.payload);
      console.log('state', state);
      const id = action.payload;
      return;
    },
  },
});

export const { logout } = userSlice.actions;
export const getUser = () => {
  return async (dispatch) => {
    const user = await userService.getUser();
    console.log(user);
  };
};
// export const logoutUser = (id) => {
//   return async (dispatch) => {
//     const response = await userService.logout();
//     if (response === 200) {
//       dispatch(removeUser(id));
//     }
//   };
// };
export default userSlice.reducer;
