import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { IProject } from './types';

export interface IProfile {
  id: string;
  userName: string;
  email: string;
  avatar?: string;
}
export interface ProfileState {
  profile: IProfile | null;
}

const initialState: ProfileState = {
  profile: null,
};

export const profileSlice = createSlice({
  name: 'profileSlice',
  initialState,
  reducers: {
    setProfile: (
      state,
      action: PayloadAction<IProfile>
    ) => {
      state.profile = action.payload;
    },
  },
});

export const { setProfile } =
  profileSlice.actions;

export default profileSlice.reducer;
