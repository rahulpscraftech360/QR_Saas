import { createSlice } from "@reduxjs/toolkit";
// const initialState = {
//   data: [],
//   // other initial state properties if any
// };
const eventDataSlice = createSlice({
  name: "eventData",
  initialState: null,
  reducers: {
    addEventData(state, action) {
      console.log("eventStore>>>>>", action.payload);
      return [action.payload]; // Concatenating new data to the existing state
    },
    updateEventData(state, action) {
      const { id, newData } = action.payload;
      return state.map((item) =>
        item.id === id ? { ...item, ...newData } : item
      );
    },
    // deleteData(state, action) {
    //   const itemToRemove = action.payload;
    //   console.log(itemToRemove);
    //   return state.filter((item) => item.id !== itemToRemove);
    // },
    // clearData(state, action) {
    //   return [];
    // },
  },
});

export const {
  addEventData,
  updateEventData,
  // deleteData,
  // clearData,
} = eventDataSlice.actions;
export default eventDataSlice.reducer;
