import { configureStore } from '@reduxjs/toolkit';

import postReducer from './reducers/postReducer';
import userReducer from './reducers/userReducer';

const store = configureStore({
  reducer: {
    posts: postReducer,
    users: userReducer,
  },
});

export default store;
