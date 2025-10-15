import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  loading: false,
  data: [],
  error: null,
};

export const SignIn = createAsyncThunk(
  "SignIn",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
        method: "POST",
        data: formData,
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

const SignInReducer = createSlice({
  name: "SignInReducer",
  initialState,
  reducers: {
    handleState: (state) => {
      state.loading = true;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(SignIn.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(SignIn.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.data = action.payload;
    });
    builder.addCase(SignIn.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export default SignInReducer.reducer;
