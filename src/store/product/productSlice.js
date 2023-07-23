import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 
import { API_URI, POSTFIX } from '../../const';

const initialState = {
  products: [],
  error: '',
};

export const productRequestAsynq = createAsyncThunk(
  'product/fetch', (category) => 
    fetch(`${API_URI}${POSTFIX}?category=${category}`)
      .then(req => req.json())
      .catch(error => ({ error }))
)

const productSlice = createSlice({
  name: 'product',
  initialState,
  extraReducers: builder => {
    builder 
      .addCase(productRequestAsynq.pending, state => {
        state.error = '';
      })
      .addCase(productRequestAsynq.fulfilled, (state, action) => {
        state.error = '';
        state.products = action.payload;
      })
      .addCase(productRequestAsynq.rejected, (state, action) => {
        state.error = action.payload.error;
      })
  },
});

export default productSlice.reducer;