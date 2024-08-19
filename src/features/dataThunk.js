import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import { SMTH_WENT_WRONG } from "../constants";

export const getSubscribers = createAsyncThunk('data/getSubscribers', async ({
  type,
  square
}, { rejectWithValue }) => {
  try {
    const req = await axiosApi(`${type}_subscriber_base/${square ? `?squares_id=${square}` : ''}`);
    return await req.data || [];
  } catch (e) {
    rejectWithValue(SMTH_WENT_WRONG);
  }
});

export const getSquares = createAsyncThunk('data/getSquares', async (_, { rejectWithValue }) => {
  try {
    const req = await axiosApi(`squares/`);
    return await req.data || [];
  } catch (e) {
    rejectWithValue(SMTH_WENT_WRONG);
  }
});
