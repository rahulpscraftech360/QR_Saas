import { createSlice } from "@reduxjs/toolkit";

const organizationSlice = createSlice({
  name: "organization",
  initialState: {
    organizationData: {},
    tokens: {},
    isOrganizationLoggedIn: false,
  },

  reducers: {
    addUser: (state, action) => {
      return {
        ...state,
        organizationData: action.payload.organizationData,
        tokens: action.payload.tokens,
        isOrganizationLoggedIn: true,
      };
    },
    removeUser: (state, action) => {
      console.log("removing");
      state.organizationData = {}; // Reset organizationData to an empty object
      state.tokens = {};
      state.isOrganizationLoggedIn = false; // Reset tokens to an empty object
      return state;
    },
  },
});

export default organizationSlice.reducer;
export const { addUser, removeUser } = organizationSlice.actions;
