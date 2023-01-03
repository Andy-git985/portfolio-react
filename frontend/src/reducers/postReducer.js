import { createSlice } from '@reduxjs/toolkit';
import postService from '../services/posts';

const postSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {
    setPostOrder(state, action) {
      console.log('ACTION: UPDATE', action);
      const updatedOrder = action.payload;
      return state.map((post, i) => (post = updatedOrder[i]));
    },
    updateOnePost(state, action) {
      console.log('ACTION: UPDATE', action);
      const updatedPost = action.payload;
      return state.map((post) =>
        post.id === updatedPost.id ? updatedPost : post
      );
    },
    removeOnePost(state, action) {
      console.log('ACTION: DELETE', action);
      const id = action.payload;
      return state.filter((post) => post.id !== id);
    },
    appendPost(state, action) {
      state.unshift(...action.payload);
    },
    setPosts(state, action) {
      return action.payload;
    },
  },
});

export const {
  setPostOrder,
  updateOnePost,
  removeOnePost,
  appendPost,
  setPosts,
} = postSlice.actions;
export const initializePosts = () => {
  return async (dispatch) => {
    const posts = await postService.getAll();
    dispatch(setPosts(posts));
  };
};
export const createPost = (content) => {
  return async (dispatch) => {
    const newPost = await postService.createNew(content);
    dispatch(appendPost(newPost));
  };
};
export const updatePost = (id, content) => {
  return async (dispatch) => {
    const updatedPost = await postService.update(id, content);
    dispatch(updateOnePost(updatedPost));
  };
};
export const updatePostOrder = (order) => {
  return async (dispatch) => {
    const updatedOrder = await postService.updateOrder(order);
    dispatch(setPostOrder(updatedOrder));
  };
};
export const removePost = (id) => {
  return async (dispatch) => {
    await postService.removeOne(id);
    dispatch(removeOnePost(id));
  };
};
export default postSlice.reducer;
