import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

export const CreateCalender = createAsyncThunk(
  "CreateCalender",
  async (dataMovie, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyDatVe/TaoLichChieu",
        method: "POST",
        data: dataMovie,
        headers: {
          Authorization: localStorage.getItem("ADMIN_INFOR")
            ? "Bearer " +
              JSON.parse(localStorage.getItem("ADMIN_INFOR")).accessToken
            : "",
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

const CalenderReducer = createSlice({
  name: "CalenderReducer",
  initialState,
  reducers: {
    resetCalenderState: (state) => {
      state.loading = true;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(CreateCalender.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(CreateCalender.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.data = action.payload;
    });
    builder.addCase(CreateCalender.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default CalenderReducer.reducer;
