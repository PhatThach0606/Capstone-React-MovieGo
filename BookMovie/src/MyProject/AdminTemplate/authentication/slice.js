import js from "@eslint/js";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const adminInfor = localStorage.getItem("ADMIN_INFOR")
  ? JSON.parse(localStorage.getItem("ADMIN_INFOR"))
  : null;
const initialState = {
  loading: false,
  data: adminInfor,
  error: null,
};

export const authLogin = createAsyncThunk(
  "AuthenReducer/authLogin",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
        method: "POST",
        data: user,
        headers: {
          TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA4NyIsIkhldEhhblN0cmluZyI6IjIzLzAzLzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc3NDIyNDAwMDAwMCIsIm5iZiI6MTc0NzI2NzIwMCwiZXhwIjoxNzc0Mzk2ODAwfQ.8AWlFkAkN_xwXppJe_FTgiJXS4WlItjxLy5olIf33HY",
        },
      });
      const authInfor = response.data.content;
      if (
        authInfor.maLoaiNguoiDung == "KhachHang" ||
        authInfor.maLoaiNguoiDung == "khachhang"
      ) {
        return rejectWithValue({
          response: {
            data: {
              content: "Bạn không có quyền truy cập",
            },
          },
        });
      }
      localStorage.setItem("ADMIN_INFOR", JSON.stringify(authInfor));
      return authInfor;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const AuthenReducer = createSlice({
  name: "AuthenReducer",
  initialState,
  reducers: {
    clearAuth: (state) => {
      state.loading = false;
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(authLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(authLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export default AuthenReducer.reducer;

export const actionLogout = () => {
  return (dispatch) => {
    localStorage.removeItem("ADMIN_INFOR");
    dispatch(AuthenReducer.actions.clearAuth());
  };
};
