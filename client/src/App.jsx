import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import AuthCheck from "./Layouts/AuthCheck";
import Home from "./Pages/Home/Home";
import CreatePlaylist from "./Pages/CreatePlaylist/CreatePlaylist";
import Play from "./Pages/Play/Play";
import Search from "./Pages/Search/Search";
import About from "./Pages/About/About";
// import Login from "./Pages/Auth/Login";
// import AuthCheck from "./Layouts/AuthCheck";
import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";
import ResetPassword from "./Pages/Auth/ResetPassword";
import ResetPasswordConfirm from "./Pages/Auth/ResetPasswordConfirm";
import Activate from "./Pages/Auth/Activate";
import Dashboard from "./Pages/Dashboard/Dashboard";
// import Auth from "./Pages/Auth/Auth";
import styles from "./App.module.css";
import { Provider } from "react-redux";
import store from "./store";
import GoogleAuth from "./Pages/Test/GoogleAuth";
import { GoogleOAuthProvider } from "@react-oauth/google";

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
              path="/reset-password"
              element={
                <AuthCheck>
                  <ResetPassword />
                </AuthCheck>
              }
            />
            <Route
              path="/reset-password-confirm"
              element={
                <AuthCheck>
                  <ResetPasswordConfirm />
                </AuthCheck>
              }
            />
            <Route
              path="/password/reset/confirm/:uid/:token"
              element={
                <AuthCheck>
                  <ResetPasswordConfirm />
                </AuthCheck>
              }
            />
            <Route
              path="/activate/:uid/:token"
              element={
                <AuthCheck>
                  <Activate />
                </AuthCheck>
              }
            />
            <Route path="/activate/:uid/:token" element={<Activate />} />
            <Route path="/googleauth" element={<GoogleAuth />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </GoogleOAuthProvider>
  );
};
export default App;
