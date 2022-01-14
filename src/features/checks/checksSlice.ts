import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {fetchChecks, submitCheckResults} from './checksAPI';
import {Check, ResultCheck} from "../../common/types";

export type ChecksState = {
  list: Check[];
  error?: Error;
  isLoading: boolean;
  isUpdating: boolean;
}

const initialState: ChecksState = {
  list: [],
  error: undefined,
  isLoading: false,
  isUpdating: false,
};

export const fetchChecksAsync = createAsyncThunk('checks/fetchChecks', async () => await fetchChecks());
export const updateChecksAsync = createAsyncThunk(
    'checks/updateChecks',
    async (checks: ResultCheck[]) => await submitCheckResults(checks)
);

export const checksSlice = createSlice({
  name: 'checks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(fetchChecksAsync.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(fetchChecksAsync.fulfilled, (state, action) => {
          state.isLoading = false;
          state.list = action.payload;
        })
        .addCase(fetchChecksAsync.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload as Error;
        })

        .addCase(updateChecksAsync.pending, (state) => {
          state.isUpdating = true;
        })
        .addCase(updateChecksAsync.fulfilled, (state) => {
          state.isUpdating = false;
        })
        .addCase(updateChecksAsync.rejected, (state, action) => {
          state.isUpdating = false;
          state.error = action.payload as Error;
        });
  },
});

export const selectChecks = (state: RootState) => state.checks;

export default checksSlice.reducer;
