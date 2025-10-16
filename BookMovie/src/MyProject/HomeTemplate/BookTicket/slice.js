import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/apiService";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchBoxOffice = createAsyncThunk(
  "fetchBoxOffice",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`
      );
      return response.data.content;
    } catch (error) {
      const message =
        error?.response?.data?.content ||
        error?.message ||
        "Lỗi không xác định";
      return rejectWithValue(message);
    }
  }
);

const bookTicketSlice = createSlice({
  name: "bookTicket",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoxOffice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBoxOffice.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchBoxOffice.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Không thể tải phòng vé";
    });
  },
});

export default bookTicketSlice.reducer;
