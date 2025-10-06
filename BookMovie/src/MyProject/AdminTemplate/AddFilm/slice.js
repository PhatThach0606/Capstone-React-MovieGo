import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  loading: false,
  data: [],
  error: null,
};

export const AddFilm = createAsyncThunk(
  "AddFilm",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/ThemPhimUploadHinh",
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

const AddFilmReducer = createSlice({
  name: "AddFilmReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(AddFilm.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(AddFilm.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(AddFilm.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export default AddFilmReducer.reducer;
