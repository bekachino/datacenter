import { createSlice } from "@reduxjs/toolkit";
import {
  getLocations, getRegions, getResolutions,
  getServiceEngineers,
  getSquares,
  getSubscribers, getSubscribersStatistics
} from "./dataThunk";

const initialState = {
  currentDrawer: '',
  subscribers: [],
  subscribersStatistics: null,
  resolutions: [],
  regions: [],
  squares: [],
  squaresWithNames: [],
  locations: [],
  locationsWithNames: [],
  serviceEngineers: [],
  subscribersLoading: false,
  subscribersStatisticsLoading: false,
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
    clearSquares: state => {
      state.squares = [];
    },
    clearLocations: state => {
      state.locations = [];
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
    
    builder.addCase(getSubscribersStatistics.pending, (state) => {
      state.subscribersStatisticsLoading = true;
      state.subscribersStatistics = null;
      state.subscribersErrorMesgage = '';
    });
    builder.addCase(getSubscribersStatistics.fulfilled, (state, { payload: res }) => {
      state.subscribersStatisticsLoading = false;
      state.subscribersStatistics = res;
    });
    builder.addCase(getSubscribersStatistics.rejected, (state, { payload: error }) => {
      state.subscribersStatisticsLoading = false;
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
  setDrawer,
  clearSquares,
  clearLocations,
  clearErrorMessages
} = DataSlice.actions;
