import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Authstate {
  isAuthenticated: boolean;
  userName: string;
}

const initialState: Authstate = {
  isAuthenticated: false,
  userName: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
  },
});

export const { login, logout, setUserName } = authSlice.actions;
export default authSlice.reducer;
