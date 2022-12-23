import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: null,
  reducers: {
    filterPosts(state, action) {
      console.log('STATE ', state);
      console.log('ACTION', action);
      return (state = action.payload);
    },
  },
});

export const { filterPosts } = filterSlice.actions;
export default filterSlice.reducer;
