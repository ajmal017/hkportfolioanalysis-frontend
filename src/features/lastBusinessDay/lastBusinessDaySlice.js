import { createSlice } from "@reduxjs/toolkit";
import { fetchLastBusinessDate } from "../../firebase/crud";

export const slice = createSlice({
  name: "lastBusinessDay",
  initialState: {
    value: 0
  },
  reducers: {
    fetch: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { fetch } = slice.actions;

export const fetchLastBusinessDateRedux = () => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  const state = getState();
  if (state.lastBusinessDay.value === 0) {  // to prevent fetching multiple times
    const lastBusinessDay = await fetchLastBusinessDate(firebase);
    dispatch(fetch(lastBusinessDay));
  }
};

export const selectLastBusinessDay = state => state.lastBusinessDay.value;

export default slice.reducer;
