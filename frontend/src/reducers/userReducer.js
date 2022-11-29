import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/user';

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    // setPostOrder(state, action) {
    //   console.log('ACTION: UPDATE', action);
    //   const updatedOrder = action.payload;
    //   return state.map((post, i) => (post = updatedOrder[i]));
    // },
    // removeOnePost(state, action) {
    //   console.log('ACTION: DELETE', action);
    //   const id = action.payload;
    //   return state.filter((post) => post.id !== id);
    // },
    // appendPost(state, action) {
    //   state.push(action.payload);
    // },
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export const getUser = () => {
  return async (dispatch) => {
    const user = await userService.getUser();
    dispatch(setUser(user));
  };
};
// export const createPost = (content) => {
//   return async (dispatch) => {
//     const newpost = await postService.createNew(content);
//     dispatch(appendPost(newpost));
//   };
// };
// export const updatePostOrder = (order) => {
//   return async (dispatch) => {
//     const updatedOrder = await postService.updateOrder(order);
//     dispatch(setPostOrder(updatedOrder));
//   };
// };
// export const removePost = (id) => {
//   return async (dispatch) => {
//     await postService.removeOne(id);
//     dispatch(removeOnePost(id));
//   };
// };
export default userSlice.reducer;
