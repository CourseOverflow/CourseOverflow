import React, { Suspense, lazy, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./Pages/Auth/Auth";
import Home from "./Pages/Home/Home";
import MyList from "./Pages/MyList/MyList";
import Search from "./Pages/Search/Search";
import CreatePlaylist from "./Pages/CreatePlaylist/CreatePlaylist";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import Footer from "./Components/Footer/Footer";
import styles from "./App.module.css"; // Your main CSS file
import { useGlobalState } from "./GlobalStateContext";
import Bookmark from "./Pages/Bookmark/Bookmark";
import Play from "./Pages/Play/Play";
import About from "./Pages/About/About";

const Blocker = () => {
  return <div className={styles.blocked}></div>;
};

const App = () => {
  const { sidebarOpen, setSidebarOpen } = useGlobalState();

  return (
    <div className={`${styles.app}`}>
      <BrowserRouter>
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex mr-0">
          <Sidebar isOpen={sidebarOpen} />
          <div className={styles.blocked}></div>
          <div
            className={
              sidebarOpen
                ? styles["margin-correction-open"]
                : styles["margin-correction-closed"]
            }
          >
            <Routes>
              <Route
                path="/CourseOverflow"
                element={
                  <>
                    <Blocker />
                    <Home sidebarOpen={sidebarOpen} />
                  </>
                }
              />
              <Route
                path="/auth"
                element={
                  <>
                    <Blocker />
                    <Auth />
                  </>
                }
              />
              <Route
                path="/create"
                element={
                  <>
                    <Blocker />
                    <CreatePlaylist />
                  </>
                }
              />
              <Route
                path="/list"
                element={
                  <>
                    <Blocker />
                    <MyList />
                  </>
                }
              />
              <Route
                path="/play"
                element={
                  <>
                    <Blocker />
                    <Play />
                  </>
                }
              />
              <Route
                path="/search"
                element={
                  <>
                    <Blocker />
                    <Search />
                  </>
                }
              />
              <Route
                path="/bookmark"
                element={
                  <>
                    <Blocker />
                    <Bookmark />
                  </>
                }
              />
              <Route
                path="/about"
                element={
                  <>
                    <Blocker />
                    <About />
                  </>
                }
              />
            </Routes>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
