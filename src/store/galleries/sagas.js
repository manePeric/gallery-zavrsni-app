import { put, call, takeLatest } from "@redux-saga/core/effects";
import {
  getGalleries,
  getGallery,
  setGalleries,
  setPaginatedGalleries,
  createGallery,
  setGalleriesWithNewGallery,
  setGallery,
  createComment,
  setGalleryWithNewComment,
  deleteGallery,
  editGallery,
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

function* handleEditGallery(action) {
  try {
    const gallery = yield call(
      galleryService.editGallery,
      action.payload.newGallery.galleryId,
      action.payload.newGallery
    );
    yield put(setGalleriesWithNewGallery(gallery));
  } catch (error) {
    alert(
      "The title has to be within 2 and 255 characters,the description is not mandatory and the images must be either jpg, jpeg or png format"
    );
  }
}

function* handleDeleteGallery(action) {
  try {
    yield call(galleryService.deleteGallery, action.payload);
    const galleries = yield call(galleryService.getGalleries, 1, null, null);
    yield put(setGalleries(galleries));
  } catch (error) {
    alert(error.message);
  }
}

function* handleCreateComment(action) {
  try {
    const newComm = yield call(
      galleryService.createComment,
      action.payload.content,
      action.payload.galleryId
    );
    yield put(setGalleryWithNewComment(newComm));
  } catch (error) {
    alert("Must be under 1000 characters");
  }
}

export function* watchGetGalleries() {
  yield takeLatest(getGalleries.type, handleGetGalleries);
}

export function* watchGetGallery() {
  yield takeLatest(getGallery.type, handleGetGallery);
}

export function* watchCreateGallery() {
  yield takeLatest(createGallery.type, handleCreateGallery);
}

export function* watchEditGallery() {
  yield takeLatest(editGallery.type, handleEditGallery);
}

export function* watchDeleteGallery() {
  yield takeLatest(deleteGallery.type, handleDeleteGallery);
}

export function* watchCreateComment() {
  yield takeLatest(createComment.type, handleCreateComment);
}
