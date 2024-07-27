import React from "react";
import store from "./store";
import styles from "./App.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";

import MainLayout from "./Layouts/MainLayout";
import AuthCheck from "./Layouts/AuthCheck";

import Home from "./Pages/Home/Home";
import CreatePlaylist from "./Pages/CreatePlaylist/CreatePlaylist";
import Play from "./Pages/Play/Play";
import Search from "./Pages/Search/Search";
import About from "./Pages/About/About";
import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";
import ResetPassword from "./Pages/Auth/ResetPassword";
import Activate from "./Pages/Auth/Activate";
import Dashboard from "./Pages/Dashboard/Dashboard";
import ForgotPassword from "./Pages/Auth/ForgotPassword";

const App = () => {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <BrowserRouter className={styles.app}>
          <Routes>
            <Route
              path="/"
              element={
                <AuthCheck>
                  <MainLayout overlay={false}>
                    <Home />
                  </MainLayout>
                </AuthCheck>
              }
            />
            <Route
              path="/create"
              element={
                <AuthCheck>
                  <MainLayout overlay={false}>
                    <CreatePlaylist />
                  </MainLayout>
                </AuthCheck>
              }
            />
            <Route
              path="/play"
              element={
                <AuthCheck>
                  <MainLayout overlay={true}>
                    <Play />
                  </MainLayout>
                </AuthCheck>
              }
            />
            <Route
              path="/search"
              element={
                <AuthCheck>
                  <MainLayout overlay={false}>
                    <Search />
                  </MainLayout>
                </AuthCheck>
              }
            />
            <Route
              path="/dashboard"
              element={
                <AuthCheck>
                  <MainLayout overlay={false}>
                    <Dashboard />
                  </MainLayout>
                </AuthCheck>
              }
            />
            <Route
              path="/about"
              element={
                <AuthCheck>
                  {" "}
                  <About />{" "}
                </AuthCheck>
              }
            />
            <Route
              path="/login"
              element={
                <AuthCheck>
                  <Login />
                </AuthCheck>
              }
            />
            <Route
              path="/signup"
              element={
                <AuthCheck>
                  <Signup />
                </AuthCheck>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <AuthCheck>
                  <ForgotPassword />
                </AuthCheck>
              }
            />
            <Route
              path="/reset-password/:uidb64/:token"
              element={
                <AuthCheck>
                  <ResetPassword />
                </AuthCheck>
              }
            />
            <Route
              path="/activate/:uidb64/:token"
              element={
                <AuthCheck>
                  <Activate />
                </AuthCheck>
              }
            />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </GoogleOAuthProvider>
  );
};
export default App;
