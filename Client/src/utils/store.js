import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import searchSlice from "./searchSlice";
import dataSlice from "./dataSlice";
import organizationSlice from "./organizationSlice";
import eventDataSlice from "./eventDataSlice";
const store = configureStore({
  reducer: {
    app: appSlice,
    search: searchSlice,
    data: dataSlice,
    organization: organizationSlice,
    eventData: eventDataSlice,
  },
});

// store.subscribe(() => {
//   const state = store.getState();

//   // Store specific parts of the state in sessionStorage
//   sessionStorage.setItem("appState", JSON.stringify(state.app));
//   sessionStorage.setItem("searchState", JSON.stringify(state.search));
//   sessionStorage.setItem(
//     "organizationState",
//     JSON.stringify(state.organization)
//   );
//   sessionStorage.setItem("eventDataSlice,", JSON.stringify(state.eventData));
//   // Similarly, store other slices' states as needed...
// });

export default store;
