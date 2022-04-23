import { put, call, takeLatest } from "@redux-saga/core/effects";
import {
  getGalleries,
  getGallery,
  setGalleries,
  setPaginatedGalleries,
  createGallery,
  setGalleriesWithNewGallery,
  setGallery,
} from "./slice";

import galleryService from "../../services/GalleryService";

function* handleGetGalleries(action) {
  try {
    const galleries = yield call(
      galleryService.getAll,
      action.payload?.page,
      action.payload?.term,
      action.payload?.userId
    );
    if (action.payload?.page > 1) {
      yield put(setPaginatedGalleries(galleries));
    } else {
      yield put(setGalleries(galleries));
    }
  } catch (error) {
    alert(error.message);
  }
}

function* handleGetGallery(action) {
  try {
    const gallery = yield call(galleryService.getGallery, action.payload);
    yield put(setGallery(gallery));
  } catch (error) {
    alert(error.message);
  }
}

function* handleCreateGallery(action) {
  try {
    const newGallery = yield call(galleryService.createGallery, action.payload);
    yield put(setGalleriesWithNewGallery(newGallery));
  } catch (error) {
    alert(
      "The title has to be within 2 and 255 characters,the description is not mandatory and the images must be either jpg, jpeg or png format"
    );
  }
}

export function* watchGetGalleries() {
  yield takeLatest(getGalleries.type, handleGetGalleries);
}

export function* watchGetGallery() {
  yield takeLatest(getGallery.type, handleGetGalleries);
}

export function* watchCreateGallery() {
  yield takeLatest(createGallery.type, handleCreateGallery);
}
