import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  loading: false,
  data: [],
  error: null,
};

export const Management = createAsyncThunk(
  "ManaReducer/Management",
  async (__, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01",
        method: "GET",
        headers: {
          TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4NyIsIkhldEhhblN0cmluZyI6IjIzLzAzLzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc3NDIyNDAwMDAwMCIsIm5iZiI6MTc0NzI2NzIwMCwiZXhwIjoxNzc0Mzk2ODAwfQ.8AWlFkAkN_xwXppJe_FTgiJXS4WlItjxLy5olIf33HY",
        },
      });
      console.log(response.data);
      return response.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const ManaReducer = createSlice({
  name: "ManaReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(Management.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(Management.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(Management.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export default ManaReducer.reducer;
