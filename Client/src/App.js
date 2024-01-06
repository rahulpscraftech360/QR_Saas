import { Provider, useSelector } from "react-redux";
import "./App.css";
import Body from "./components/Body";
import Head from "./components/Head";
import store from "./utils/store";
// import {
//   Route,
//   RouterProvider,
//   Routes,
//   createBrowserRouter,
// } from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
  Navigate,
} from "react-router-dom";
import MainContainer from "./components/MainContainer";
import Login from "./Page/Login";

import EventsPage from "./Page/EventPage";
import EventCreationForm from "./Page/EventCreationForm";
import AddParticipants from "./Page/AddParticipants";
import Invitation from "./Page/Invitation";
import Updates from "./Page/Updates";
import Today from "./Page/Today";
import ScanQR from "./Page/ScanQR";
import TabPreview from "./Page/TabPreview";

const AppRouter = () => {
  const isLogin = Boolean(
    useSelector((store) => store.organization.tokens.access)
  );
  console.log("isLogin>>>>>>>>>>>", isLogin);
  // Boolean()

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isLogin ? <MainContainer /> : <Navigate to="/organization/login" />
          }
        />
        <Route
          path="/organization/login"
          element={!isLogin ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/events"
          element={
            isLogin ? <EventsPage /> : <Navigate to="/organization/login" />
          }
        />
        <Route
          path="/events/create"
          element={
            isLogin ? (
              <EventCreationForm />
            ) : (
              <Navigate to="/organization/login" />
            )
          }
        />
        <Route
          path="/events/:eventId/participants"
          element={<AddParticipants />}
        />
        <Route path="/events/:eventId/tabPreview" element={<TabPreview />} />
        <Route
          path="/events/:id/sendInvitation"
          element={
            isLogin ? <Invitation /> : <Navigate to="/organization/login" />
          }
        />
        <Route
          path="/events/:id/scan"
          element={isLogin ? <ScanQR /> : <Navigate to="/organization/login" />}
        />
        <Route
          path="/events/updates"
          element={
            isLogin ? <Updates /> : <Navigate to="/organization/login" />
          }
        />
        <Route path="/events/today" element={<Today />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
