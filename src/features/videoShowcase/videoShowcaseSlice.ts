import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

type VideoShowcaseState = {
  show: boolean;
  url: string | null;
};

const initialState: VideoShowcaseState = {
  show: false,
  url: null,
};

export const videoShowcaseSlice = createSlice({
  name: "videoShowcaseSlice",
  initialState,
  reducers: {
    openVideoShowcase: (state, actions: { payload: string }) => {
      state.show = true;
      state.url = actions.payload;
    },
    closeVideoShowcase: (state) => {
      state.show = false;
      state.url = null;
    },
  },
});

export const { closeVideoShowcase, openVideoShowcase } =
  videoShowcaseSlice.actions;
export const selectVideoShowcase = (state: RootState) =>
  state.videoShowcaseSlice;
