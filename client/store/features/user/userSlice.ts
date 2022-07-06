//utils
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@store/app/store';

//types
import { appUser } from '@appTypes/user';

const nullUser = {
  email: '',
  token: '',
};

export interface UserState {
  user: appUser;
}

const initialState: UserState = {
  user: nullUser,
};

const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    LOGIN: (state, { payload }: PayloadAction<appUser>) => {
      state.user = payload;
    },
    SET_TOKEN: (state, { payload }: PayloadAction<string>) => {
      state.user = { ...state.user, token: payload };
    },
    LOGOUT: state => {
      state.user = nullUser;
    },
  },
});

export const { LOGIN, LOGOUT, SET_TOKEN } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
