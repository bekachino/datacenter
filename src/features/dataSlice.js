import { createSlice } from "@reduxjs/toolkit";
import {
  getResolutions,
  getSquares,
  getSubscribers,
  getTemplates,
  getWorks,
  getWorkStatuses
} from "./dataThunk";

const initialState = {
  currentDrawer: '',
  subscribers: [],
  squares: [],
  works: [],
  templates: [],
  resolutions: [],
  statuses: [],
  subscribersLoading: false,
  squaresLoading: false,
  worksLoading: false,
  subscribersErrorMessage: '',
  squaresErrorMessage: '',
  worksErrorMessage: '',
  templatesErrorMessage: '',
  resolutionsErrorMessage: '',
  statusesErrorMessage: '',
  
};

const DataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setDrawer: (state, action) => {
      state.currentDrawer = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSubscribers.pending, (state) => {
      state.subscribersLoading = true;
      state.subscribers = [];
      state.subscribersErrorMesgage = '';
    });
    builder.addCase(getSubscribers.fulfilled, (state, { payload: res }) => {
      state.subscribersLoading = false;
      state.subscribers = res;
    });
    builder.addCase(getSubscribers.rejected, (state, { payload: error }) => {
      state.subscribersLoading = false;
      state.subscribersErrorMesgage = error;
    });
    
    builder.addCase(getSquares.pending, (state) => {
      state.squaresLoading = true;
      state.subscribers = [];
      state.squaresErrorMessage = '';
    });
    builder.addCase(getSquares.fulfilled, (state, { payload: res }) => {
      state.squaresLoading = false;
      state.squares = res;
    });
    builder.addCase(getSquares.rejected, (state, { payload: error }) => {
      state.squaresLoading = false;
      state.squaresErrorMessage = error;
    });
    
    builder.addCase(getWorks.pending, (state) => {
      state.worksLoading = true;
      state.works = [];
      state.worksrrorMesgage = '';
    });
    builder.addCase(getWorks.fulfilled, (state, { payload: res }) => {
      state.worksLoading = false;
      state.works = res;
    });
    builder.addCase(getWorks.rejected, (state, { payload: error }) => {
      state.worksLoading = false;
      state.worksrrorMesgage = error;
    });
    
    builder.addCase(getTemplates.pending, (state) => {
      state.templates = [];
      state.templatesErrorMessage = '';
    });
    builder.addCase(getTemplates.fulfilled, (state, { payload: res }) => {
      state.templates = res;
    });
    builder.addCase(getTemplates.rejected, (state, { payload: error }) => {
      state.templatesErrorMessage = error;
    });
    
    builder.addCase(getResolutions.pending, (state) => {
      state.resolutions = [];
      state.resolutionsErrorMessage = '';
    });
    builder.addCase(getResolutions.fulfilled, (state, { payload: res }) => {
      state.resolutions = res;
    });
    builder.addCase(getResolutions.rejected, (state, { payload: error }) => {
      state.resolutionsErrorMessage = error;
    });
    
    builder.addCase(getWorkStatuses.pending, (state) => {
      state.statuses = [];
      state.statusesErrorMessage = '';
    });
    builder.addCase(getWorkStatuses.fulfilled, (state, { payload: res }) => {
      state.statuses = res;
    });
    builder.addCase(getWorkStatuses.rejected, (state, { payload: error }) => {
      state.statusesErrorMessage = error;
    });
  },
});

export const dataReducer = DataSlice.reducer;
export const {
  setDrawer,
} = DataSlice.actions;
