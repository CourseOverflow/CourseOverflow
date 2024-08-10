import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import styles from "./App.module.css";

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
import useAlerts from "./Hooks/useAlerts";
import useTheme from "./Hooks/useTheme";

const App = () => {
  const { isDark } = useTheme();
  useAlerts();
  return (
    <BrowserRouter className={styles.app} theme={isDark ? "dark" : "light"}>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout overlay={false}>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/create"
          element={
            <MainLayout overlay={false}>
              <CreatePlaylist />
            </MainLayout>
          }
        />
        <Route
          path="/play"
          element={
            <MainLayout overlay={true}>
              <Play />
            </MainLayout>
          }
        />
        <Route
          path="/search"
          element={
            <MainLayout overlay={false}>
              <Search />
            </MainLayout>
          }
        />
        <Route
          path="/u/:username"
          element={
            <MainLayout overlay={false}>
              <Dashboard />
            </MainLayout>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/reset-password/:uidb64/:token"
          element={<ResetPassword />}
        />
        <Route path="/activate/:uidb64/:token" element={<Activate />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
