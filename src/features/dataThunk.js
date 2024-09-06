import axiosApi from "../axiosApi";
import { createAsyncThunk } from "@reduxjs/toolkit";
import dayjs from "dayjs";

export const getSubscribers = createAsyncThunk('data/getSubscribers', async ({
  abonType = 'active',
  squares_id,
  location_id,
  service_engineers_id,
  start_date,
  end_date,
  skip,
  limit,
}, { rejectWithValue }) => {
  try {
    const squaresQuery = squares_id ? `&squares_id=${squares_id}` : '';
    const locationQuery = location_id ? `&location_id=${location_id}` : '';
    const serviceEngineerQuery = service_engineers_id ? `&service_engineers_id=${service_engineers_id}` : '';
    const startDate = !!start_date && !!end_date ? `&start_date=${dayjs(start_date, 'DD.MM.YYYY').format('YYYY-MM-DD')}` : '';
    const endDate = !!start_date && !!end_date ? `&end_date=${dayjs(end_date, 'DD.MM.YYYY').format('YYYY-MM-DD')}` : '';
    
    const req = await axiosApi(`${abonType}_subscriber_base/?skip=${skip || 1}&limit=${limit || 100}${squaresQuery}${locationQuery}${serviceEngineerQuery}${startDate}${endDate}`);
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

export const getLocations = createAsyncThunk('data/getLocations', async (_, { rejectWithValue }) => {
  try {
    const req = await axiosApi(`locations/`);
    return await req.data || [];
  } catch (e) {
    rejectWithValue('Ошибка при получении локаций');
  }
});

export const getServiceEngineers = createAsyncThunk('data/getServiceEngineers', async (_, { rejectWithValue }) => {
  try {
    const req = await axiosApi(`service_engineers/`);
    return await req.data || [];
  } catch (e) {
    rejectWithValue('Ошибка при получении списка СИ');
  }
});
