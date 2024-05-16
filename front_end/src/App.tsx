import React from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import CompleteProfileForm from './components/CompleteProfileForm';
import Resources from "./components/Resources";
import Home from "./components/Home";
import Header from "./components/Header";
import FileUpload from "./components/FileUpload";
import TeacherResources from "./components/TeacherResources";
import { RootState } from "./store/store";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
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
  );
}

export default App;

