import { configureStore } from '@reduxjs/toolkit';
import songsReducer from './songsSlice';
import songReducer from './songSlice';

const store = configureStore({
  reducer: {
    songs: songsReducer,
    song: songReducer,   
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
