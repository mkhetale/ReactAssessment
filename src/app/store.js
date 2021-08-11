import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import noteReducer from '../features/notes/noteSlice';

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    note: noteReducer,
  },
});
