import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentDrawer: '',
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
  },
});

export const dataReducer = DataSlice.reducer;
export const {
  setDrawer,
} = DataSlice.actions;
