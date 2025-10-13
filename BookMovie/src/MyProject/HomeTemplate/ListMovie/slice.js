import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/apiService";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

export const fetchData = createAsyncThunk(
  "fetchData",
  async (__, { rejectWithValue }) => {
    try {
      const response = await api.get("QuanLyPhim/LayDanhSachPhim?maNhom=GP06");

      return response.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const listMovieReducer = createSlice({
  name: "listMovieReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });

    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default listMovieReducer.reducer;
