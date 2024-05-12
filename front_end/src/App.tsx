import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import CompleteProfileForm from './components/CompleteProfileForm';
import Resources from "./components/Resources";
import Home from "./components/Home";
import Header from "./components/Header";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/complete-profile" element={<CompleteProfileForm />} />
                <Route path="*" element={<LayoutWithHeader />} />
            </Routes>
        </BrowserRouter>
    );
}

function LayoutWithHeader() {
    return (
        <>
            <Header isLoggedIn={true}/>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/resources" element={<Resources />} />
            </Routes>
        </>
    );
}

export default App;

