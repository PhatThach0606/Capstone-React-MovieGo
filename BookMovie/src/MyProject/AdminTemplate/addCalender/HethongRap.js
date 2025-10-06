import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

export const SystemTheater = createAsyncThunk(
  "SystemTheater",
  async (__, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap",
        method: "GET",

        headers: {
          TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4NyIsIkhldEhhblN0cmluZyI6IjIzLzAzLzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc3NDIyNDAwMDAwMCIsIm5iZiI6MTc0NzI2NzIwMCwiZXhwIjoxNzc0Mzk2ODAwfQ.8AWlFkAkN_xwXppJe_FTgiJXS4WlItjxLy5olIf33HY",
        },
      });
      return response.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const SystemTheaterReducer = createSlice({
  name: "SystemTheaterReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(SystemTheater.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(SystemTheater.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(SystemTheater.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default SystemTheaterReducer.reducer;
