import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Song } from "../Types/SongTypes";

interface SongsState {
  songs: Song[];
  loading: boolean;
  error: string | null;
}

interface UpdateSongPayload {
  id: string;
  updatedSong: Song;
}

const initialState: SongsState = {
  songs: [],
  loading: false,
  error: null,
};

const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    getSongsStart(state) {
      state.loading = true;
      state.error = null;
    },
    getSongsSuccess(state, action: PayloadAction<Song[]>) {
      state.songs = action.payload;
      state.loading = false;
    },
    getSongsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addSongStart(state) {
      state.loading = true;
      state.error = null;
    },
    addSongSuccess(state, action: PayloadAction<Song>) {
      state.songs.push(action.payload);
      state.loading = false;
    },
    addSongFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteSongStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteSongSuccess(state, action: PayloadAction<string>) {
      state.songs = state.songs.filter((song) => song._id !== action.payload);
      state.loading = false;
    },
    deleteSongFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updateSongStart(state, action: PayloadAction<UpdateSongPayload>) { 
      state.loading = true;
      state.error = null;
      console.log(action.payload)
    },
    updateSongSuccess(state, action: PayloadAction<Song>) {
      state.loading = false;
      const index = state.songs.findIndex(
        (song) => song._id === action.payload._id
      );
      if (index !== -1) {
        state.songs[index] = action.payload;
      }
    },
    updateSongFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getSongsStart,
  getSongsSuccess,
  getSongsFailure,
  addSongStart,
  addSongSuccess,
  addSongFailure,
  deleteSongStart,
  deleteSongSuccess,
  deleteSongFailure,
  updateSongStart, 
  updateSongSuccess,
  updateSongFailure,
} = songsSlice.actions;

export default songsSlice.reducer;
