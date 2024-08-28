import { createSlice } from "@reduxjs/toolkit";
import { getSquares, getSubscribers } from "./dataThunk";

const initialState = {
  currentDrawer: '',
  subscribers: [],
  squares: [],
  subscribersLoading: false,
  squaresLoading: false,
  subscribersErrorMessage: '',
  squaresErrorMessage: '',
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
  },
});

export const dataReducer = DataSlice.reducer;
export const {
  setDrawer,
} = DataSlice.actions;
