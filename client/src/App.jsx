import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import Home from "./Pages/Home/Home";
import CreatePlaylist from "./Pages/CreatePlaylist/CreatePlaylist";
import Play from "./Pages/Play/Play";
import Search from "./Pages/Search/Search";
import About from "./Pages/About/About";
import Auth from "./Pages/Auth/Auth";
import styles from "./App.module.css";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Rat from "./Pages/Rat/Rat";

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
          path="/dashboard"
          element={
            <MainLayout overlay={false}>
              <Dashboard />
            </MainLayout>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/rat" element={<Rat />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
