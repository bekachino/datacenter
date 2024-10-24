import { createSlice } from "@reduxjs/toolkit";
import {
  getLocations, getRegions, getResolutions,
  getServiceEngineers,
  getSquares,
  getSubscribers
} from "./dataThunk";

const initialState = {
  currentDrawer: '',
  subscribers: [],
  resolutions: [],
  regions: [],
  squares: [],
  squaresWithNames: [],
  locations: [],
  locationsWithNames: [],
  serviceEngineers: [],
  subscribersLoading: false,
  resolutionsLoading: false,
  regionsLoading: false,
  squaresLoading: false,
  locationsLoading: false,
  serviceEngineersLoading: false,
  subscribersErrorMessage: '',
  resolutionsErrorMessage: '',
  filterDataErrorMessage: '',
};

const DataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setDrawer: (state, action) => {
      state.currentDrawer = action.payload;
    },
    clearErrorMessages: state => {
      state.subscribersErrorMessage = '';
      state.resolutionsErrorMessage = '';
      state.filterDataErrorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSubscribers.pending, (state) => {
      state.subscribersLoading = true;
      state.subscribers = [];
      state.resolutions = [];
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
    
    builder.addCase(getResolutions.pending, (state) => {
      state.resolutionsLoading = true;
      state.subscribers = [];
      state.resolutions = [];
      state.resolutionsErrorMesgage = '';
    });
    builder.addCase(getResolutions.fulfilled, (state, { payload: res }) => {
      state.resolutionsLoading = false;
      state.resolutions = res;
    });
    builder.addCase(getResolutions.rejected, (state, { payload: error }) => {
      state.resolutionsLoading = false;
      state.resolutionsErrorMesgage = error;
    });
    
    builder.addCase(getRegions.pending, (state) => {
      state.regionsLoading = true;
      state.filterDataErrorMessage = '';
    });
    builder.addCase(getRegions.fulfilled, (state, { payload: res }) => {
      state.regionsLoading = false;
      state.regions = res;
    });
    builder.addCase(getRegions.rejected, (state, { payload: error }) => {
      state.regionsLoading = false;
      state.filterDataErrorMessage = error;
    });
    
    builder.addCase(getSquares.pending, (state) => {
      state.squaresLoading = true;
      state.filterDataErrorMessage = '';
    });
    builder.addCase(getSquares.fulfilled, (state, { payload: res }) => {
      state.squaresLoading = false;
      state.squares = res[0];
      state.squaresWithNames = res[1];
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
      state.locations = res[0];
      state.locationsWithNames = res[1];
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
  setDrawer, clearErrorMessages
} = DataSlice.actions;
