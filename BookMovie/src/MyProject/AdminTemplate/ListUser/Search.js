import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  loading: false,
  data: [],
  error: null,
};

export const SearchUser = createAsyncThunk(
  "SearchUser",
  async (tuKhoa, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: `https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP06&tuKhoa=${tuKhoa}`,
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

const SearchUserReducer = createSlice({
  name: "SearchUserReducer",
  initialState,
  reducers: {
    removeUser: (state, action) => {
      state.data = state.data.filter(
        (user) => user.taiKhoan !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(SearchUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(SearchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(SearchUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export default SearchUserReducer.reducer;
