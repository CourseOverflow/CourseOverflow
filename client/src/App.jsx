import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import Home from "./Pages/Home/Home";
import CreatePlaylist from "./Pages/CreatePlaylist/CreatePlaylist";
import Play from "./Pages/Play/Play";
import Search from "./Pages/Search/Search";
import About from "./Pages/About/About";
import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";
import ResetPassword from "./Pages/Auth/ResetPassword";
import ResetPasswordConfirm from "./Pages/Auth/ResetPasswordConfirm";
import Activate from "./Pages/Auth/Activate";
import Auth from "./Pages/Auth/Auth";
import styles from "./App.module.css";

const App = () => {
  return (
    <BrowserRouter className={styles.app}>
      <Routes>
        <Route
          path="/CourseOverflow"
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
          path="/play/:slug"
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
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/password/reset/confirm/:uid/:token"
          element={<ResetPasswordConfirm />}
        />
        <Route path="/activate/:uid/:token" element={<Activate />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
