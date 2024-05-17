import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

function App() {
  const [theme, setTheme] = useState(lightTheme);
  Modal.setAppElement('#root');

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/complete-profile" element={<CompleteProfileForm />} />
              <Route path="/home" element={<Home />} />
              <Route path="/resources" element={<Resources />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </>
    </ThemeProvider>
  );
}

export default App;