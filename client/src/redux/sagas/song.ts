import { takeLatest, call, put, all } from 'redux-saga/effects';
import {
  deleteSongAPI,
  getSongsAPI,
  createSongAPI,
  updateSongAPI,
} from '../../services/ApiHandler';

import {
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
} from '../songsSlice';

function* handleDeleteSong(action: ReturnType<typeof deleteSongStart>): Generator<any, void, any> {
  try {
    if (action.payload) {
      yield call(deleteSongAPI, action.payload);
      yield put(deleteSongSuccess(action.payload));
    } else {
      yield put(deleteSongFailure('Delete action payload is missing'));
    }
  } catch (error) {
    if (error instanceof Error) {
      yield put(deleteSongFailure(error.message));
    } else {
      yield put(deleteSongFailure('An unknown error occurred'));
    }
  }
}

function* handleAddSong(action: ReturnType<typeof addSongStart>): Generator<any, void, any> {
  try {
    if (action.payload) {
      const newSong = yield call(createSongAPI, action.payload);
      yield put(addSongSuccess(newSong.data));
    } else {
      yield put(addSongFailure('Add song action payload is missing'));
    }
  } catch (error) {
    if (error instanceof Error) {
      yield put(addSongFailure(error.message));
    } else {
      yield put(addSongFailure('An unknown error occurred'));
    }
  }
}

function* handleEditSong(action: ReturnType<typeof updateSongStart>): Generator<any, void, any> {
  try {
    if (action.payload && action.payload.id && action.payload.updatedSong) {
      const updatedSong = yield call(updateSongAPI, action.payload.id, action.payload.updatedSong);
      yield put(updateSongSuccess(updatedSong.data));
    } else {
      yield put(updateSongFailure('Edit action payload is missing or incomplete'));
    }
  } catch (error) {
    if (error instanceof Error) {
      yield put(updateSongFailure(error.message));
    } else {
      yield put(updateSongFailure('An unknown error occurred'));
    }
  }
}

function* handleGetSongs(): Generator<any, void, any> {
  try {
    const songs = yield call(getSongsAPI);
    yield put(getSongsSuccess(songs.data));
  } catch (error) {
    if (error instanceof Error) {
      yield put(getSongsFailure(error.message));
    } else {
      yield put(getSongsFailure('An unknown error occurred'));
    }
  }
}

function* watchDeleteSong() {
  yield takeLatest(deleteSongStart.type, handleDeleteSong);
}

function* watchAddSong() {
  yield takeLatest(addSongStart.type, handleAddSong);
}

function* watchEditSong() {
  yield takeLatest(updateSongStart.type, handleEditSong);
}

function* watchGetSongs() {
  yield takeLatest(getSongsStart.type, handleGetSongs);
}

export default function* songSaga() {
  yield all([
    watchDeleteSong(),
    watchAddSong(),
    watchEditSong(),
    watchGetSongs(),
  ]);
}
