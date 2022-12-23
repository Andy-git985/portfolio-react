import { configureStore } from '@reduxjs/toolkit';

import postReducer from './reducers/postReducer';
import userReducer from './reducers/userReducer';
import filterReducer from './reducers/filterReducer';

const store = configureStore({
  reducer: {
    posts: postReducer,
    user: userReducer,
    filter: filterReducer,
  },
});

export default store;
