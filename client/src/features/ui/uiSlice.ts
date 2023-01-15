import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface UiState {
  isSidenavOpen: boolean;
  isRegisterFormOpen: boolean;
  isLoginFormOpen: boolean;
  isUserMenuOpen: boolean;
  isUploadFormOpen: boolean;
  isEditFormOpen: boolean;
}

export const initialState: UiState = {
  isSidenavOpen: false,
  isRegisterFormOpen: false,
  isLoginFormOpen: false,
  isUserMenuOpen: false,
  isUploadFormOpen: false,
  isEditFormOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    sidenavToggle: (state, action: PayloadAction<boolean>) => {
      state.isSidenavOpen = action.payload;
    },
    registerFormToggle: (state, action: PayloadAction<boolean>) => {
      state.isRegisterFormOpen = action.payload;
    },
    loginFormToggle: (state, action: PayloadAction<boolean>) => {
      state.isLoginFormOpen = action.payload;
    },
    userMenuToggle: (state, action: PayloadAction<boolean>) => {
      state.isUserMenuOpen = action.payload;
    },
    uploadFormToggle: (state, action: PayloadAction<boolean>) => {
      state.isUploadFormOpen = action.payload;
    },
    editFormToggle: (state, action: PayloadAction<boolean>) => {
      state.isEditFormOpen = action.payload;
    },
  },
});

export const {
  sidenavToggle,
  registerFormToggle,
  loginFormToggle,
  uploadFormToggle,
  userMenuToggle,
  editFormToggle,
} = uiSlice.actions;

export const selectUI = (state: RootState) => state.ui;

export default uiSlice.reducer;
