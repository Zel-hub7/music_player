import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Song } from "../Types/SongTypes";

interface SongState {
  song: Song | null;
  loading: boolean;
  error: string | null;
}

const initialState: SongState = {
  song: null,
  loading: false,
  error: null,
};

const songSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    getSongStart(state) {
      state.loading = true;
      state.error = null;
    },
    getSongSuccess(state, action: PayloadAction<Song>) {
      state.song = action.payload;
      state.loading = false;
    },
    getSongFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getSongStart, getSongSuccess, getSongFailure } =
  songSlice.actions;

export default songSlice.reducer;
