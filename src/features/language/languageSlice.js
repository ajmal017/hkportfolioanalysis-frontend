import { createSlice } from "@reduxjs/toolkit";
import { getLanguage, setLanguageLocalStorage } from "../../localStorageUtils";

export const slice = createSlice({
  name: "language",
  initialState: {
    value: getLanguage() || "en",
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.value = action.payload;
      setLanguageLocalStorage(action.payload);
    },
  },
});

export const { changeLanguage } = slice.actions;
export const selectLanguage = (state) => state.language.value;
export default slice.reducer;
