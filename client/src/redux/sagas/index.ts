import songSaga from "./song";
import { all } from "redux-saga/effects";

export function* rootSaga() {
  yield all([songSaga()]);
}
