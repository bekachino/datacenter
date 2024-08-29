import axiosApi from "../axiosApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSubscribers = createAsyncThunk('data/getSubscribers', async ({
  abonType = 'active',
  squares_id,
  skip,
  limit,
}, { rejectWithValue }) => {
  try {
    const squaresQuery = squares_id ? `&squares_id=${squares_id}` : '';
    
    const req = await axiosApi(`${abonType}_subscriber_base/?skip=${skip || 1}&limit=${limit || 100}${squaresQuery}`);
    return await req.data || [];
  } catch (e) {
    rejectWithValue('Ошибка при получении абонентов');
  }
});

export const getSquares = createAsyncThunk('data/getSquares', async (_, { rejectWithValue }) => {
  try {
    const req = await axiosApi(`squares/`);
    return await req.data || [];
  } catch (e) {
    rejectWithValue('Ошибка при получении квадратов');
  }
});
