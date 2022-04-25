import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  getGalleries() {},
  getGallery() {},
  createGallery() {},
  editGallery() {},
  deleteGallery() {},
  createComment() {},
};

const galleriesSlice = createSlice({
  name: "galleries",
  initialState: {
    page: {
      data: [],
      current_page: 0,
      last_page: 0,
    },
    gallery: null,
    term: null,
    userId: null,
  },

  reducers: {
    setGalleries(state, action) {
      state.page = action.payload;
    },
    setSearchTerm(state, action) {
      state.term = action.payload;
    },
    setSearchUserId(state, action) {
      state.userId = action.payload;
    },
    setPaginatedGalleries(state, action) {
      state.page.data = [...state.page.data, ...action.payload.data];
      state.page.current_page = action.payload.current_page;
    },
    setGallery(state, action) {
      state.gallery = action.payload;
    },
    setGalleriesWithNewGallery(state, action) {
      state.page.data = [...state.page.data, action.payload];
    },
    setGalleryWithNewComment(state, action) {
      state.gallery = {
        ...state.gallery,
        comments: [...state.gallery.comments, action.payload],
      };
    },
    ...middlewareActions,
  },
});

export const {
  getGalleries,
  setGalleries,
  setSearchTerm,
  setSearchUserId,
  setPaginatedGalleries,
  setGallery,
  getGallery,
  createGallery,
  setGalleriesWithNewGallery,
  createComment,
  setGalleryWithNewComment,
  editGallery,
  deleteGallery,
} = galleriesSlice.actions;

export default galleriesSlice.reducer;
