import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import { lightTheme, darkTheme } from './styles/theme';
import LandingPage from './components/LandingPage';
import CompleteProfileForm from './components/CompleteProfileForm';
import Resources from "./components/Resources";
import Home from "./components/Home";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import ProfileSettings from "./components/ProfileSettings";
import { ToastContainer } from "react-toastify";

function App() {
  const [theme, setTheme] = useState(lightTheme);
  Modal.setAppElement('#root');
  const isLoggedIn = useSelector((state: RootState) => state.auth.token !== null);

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <BrowserRouter>
          <ToastContainer />
          <Header />
          <Routes>
            <Route path="/" element={isLoggedIn ? <Navigate to="/home" replace={true} /> : <LandingPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/complete-profile" element={<CompleteProfileForm />} />
              <Route path="/home" element={<Home />} />
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