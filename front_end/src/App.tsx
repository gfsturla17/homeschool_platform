import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from 'styled-components';
import { lightTheme} from './styles/theme';
import LandingPage from './components/Pages/LandingPage/LandingPage';
import CompleteProfileForm from './components/Pages/CompleteProfilePage/CompleteProfilePage';
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
import TeacherAvailabilityCalendar from "./components/Pages/TeacherAvailabilityPage/TeacherAvailabilityCalendar";
import { ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache } from "@apollo/client";

const httpLink = new HttpLink({ uri: 'http://localhost:3000/graphql' });

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('token');

  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });

  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [theme] = useState(lightTheme);
  Modal.setAppElement('#root');
  const isLoggedIn = useSelector((state: RootState) => state.auth.token !== null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(rehydrateAuth());
  }, [dispatch]);



  return (
    <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <>
        <BrowserRouter>
          <ToastContainer />
          <Header />
          <Routes>
            <Route path="/" element={isLoggedIn ? <Navigate to="/home" replace={true} /> : <LandingPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/complete-profile" element={<CompleteProfileForm />} />
              <Route path="/availability" element={<TeacherAvailabilityCalendar />} />
              <Route path="/home" element={<TeacherDashboard />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/profile-settings" element={<ProfileSettings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </>
    </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;