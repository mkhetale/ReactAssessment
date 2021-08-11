import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import noteReducer from '../features/notes/noteSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const persistConfig = {
  key: 'authType',
  storage: storage,
  whitelist: ['authType'] // which reducer want to store
};

const pReducer = persistReducer(persistConfig, noteReducer);

const store = configureStore({
  reducer: {
    // counter: counterReducer,
    note: pReducer,
  },
});
const persistor = persistStore(store);

export { store, persistor };