import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";

export const getSubscribers = createAsyncThunk('data/getSubscribers', async ({
  type,
  square,
  skip,
  limit,
}, { rejectWithValue }) => {
  try {
    const req = await axiosApi(`${type}_subscriber_base/?skip=${skip || 1}&limit=${limit || 100}${square ? `&squares_id=${square}` : ''}`);
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

export const getWorks = createAsyncThunk('data/getWorks', async ({
  square,
  skip,
  limit,
}, { rejectWithValue }) => {
  try {
    const req = await axiosApi(`work/?skip=${skip || 1}&limit=${limit || 100}${square ? `&squares_id=${square}` : ''}`);
    return await req.data || [];
  } catch (e) {
    rejectWithValue('Ошибка при получении нарядов');
  }
});

export const getTemplates = createAsyncThunk('data/getTemplates', async (_, { rejectWithValue }) => {
  try {
    const req = await axiosApi(`templates_list/`);
    const res = await req.data || [];
    return res.map(template => (
      {
        id: template?.id,
        name: template?.name
      }
    ))
  } catch (e) {
    rejectWithValue('Ошибка при получении шаблонов');
  }
});

export const getResolutions = createAsyncThunk('data/getResolutions', async (_, { rejectWithValue }) => {
  try {
    const req = await axiosApi(`resolution/`);
    return await req.data || [];
  } catch (e) {
    rejectWithValue('Ошибка при получении резолюций');
  }
});

export const getWorkStatuses = createAsyncThunk('data/getWorkStatuses', async (_, { rejectWithValue }) => {
  try {
    const req = await axiosApi(`status/`);
    return await req.data || [];
  } catch (e) {
    rejectWithValue('Ошибка при получении резолюций');
  }
});
