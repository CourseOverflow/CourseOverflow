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
import Play from "./Pages/Play/Play";

const Blocker = () => {
  return <div className={styles.blocked}></div>;
};

const App = () => {
  const { sidebarOpen, setSidebarOpen } = useGlobalState();

  return (
    <div className={`${styles.app}`}>
      <Suspense fallback={<div>Loading...</div>}>
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
                  path="/"
                  element={
                    <>
                      <Blocker />
                      <Auth />
                    </>
                  }
                />
                <Route
                  path="/home"
                  element={
                    <>
                      <Blocker />
                      <Home sidebarOpen={sidebarOpen} />
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
              </Routes>
              <Footer />
            </div>
          </div>
        </BrowserRouter>
      </Suspense>
    </div>
  );
};

export default App;
