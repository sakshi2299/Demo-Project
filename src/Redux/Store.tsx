import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';

// interface RootState {
//   user: UserState;
// }

const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export default store;
