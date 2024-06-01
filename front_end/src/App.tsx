import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from 'styled-components';
import { lightTheme} from './styles/theme';
import LandingPage from './components/Pages/LandingPage/LandingPage';
import CompleteProfileForm from './components/Pages/CompleteProfilePage/CompleteProfileForm';
import Resources from "./components/Pages/ResourcePage/Resources";
import Header from "./components/Layout/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import ProfileSettings from "./components/Pages/ProfileSettingsPage/ProfileSettings";
import { ToastContainer } from "react-toastify";
import TeacherDashboard from "./components/Pages/TeacherDashboardPage/TeacherDashboard";
import { rehydrateAuth } from "./store/authSlice";

function App() {
  const [theme] = useState(lightTheme);
  Modal.setAppElement('#root');
  const isLoggedIn = useSelector((state: RootState) => state.auth.token !== null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(rehydrateAuth());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <>
        <BrowserRouter>
          <ToastContainer />
          <Header />
          <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBwn1o-TzQ0oc39YmmhdmM4dukkT9RUXNg}&libraries=places"></script>
          <Routes>
            <Route path="/" element={isLoggedIn ? <Navigate to="/home" replace={true} /> : <LandingPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/complete-profile" element={<CompleteProfileForm />} />
              <Route path="/home" element={<TeacherDashboard />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/profile-settings" element={<ProfileSettings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </>
    </ThemeProvider>
  );
}

export default App;