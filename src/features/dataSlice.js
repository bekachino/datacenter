import { createSlice } from "@reduxjs/toolkit";
import {
  getLocations,
  getServiceEngineers,
  getSquares,
  getSubscribers
} from "./dataThunk";

const initialState = {
  currentDrawer: '',
  subscribers: [],
  squares: [],
  locations: [],
  serviceEngineers: [],
  subscribersLoading: false,
  squaresLoading: false,
  locationsLoading: false,
  serviceEngineersLoading: false,
  subscribersErrorMessage: '',
  filterDataErrorMessage: '',
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
      state.filterDataErrorMessage = '';
    });
    builder.addCase(getSquares.fulfilled, (state, { payload: res }) => {
      state.squaresLoading = false;
      state.squares = res;
    });
    builder.addCase(getSquares.rejected, (state, { payload: error }) => {
      state.squaresLoading = false;
      state.filterDataErrorMessage = error;
    });
    
    builder.addCase(getLocations.pending, (state) => {
      state.locationsLoading = true;
      state.filterDataErrorMessage = '';
    });
    builder.addCase(getLocations.fulfilled, (state, { payload: res }) => {
      state.locationsLoading = false;
      state.locations = res;
    });
    builder.addCase(getLocations.rejected, (state, { payload: error }) => {
      state.locationsLoading = false;
      state.filterDataErrorMessage = error;
    });
    
    builder.addCase(getServiceEngineers.pending, (state) => {
      state.serviceEngineersLoading = true;
      state.filterDataErrorMessage = '';
    });
    builder.addCase(getServiceEngineers.fulfilled, (state, { payload: res }) => {
      state.serviceEngineersLoading = false;
      state.serviceEngineers = res;
    });
    builder.addCase(getServiceEngineers.rejected, (state, { payload: error }) => {
      state.serviceEngineersLoading = false;
      state.filterDataErrorMessage = error;
    });
  },
});

export const dataReducer = DataSlice.reducer;
export const {
  setDrawer,
} = DataSlice.actions;
