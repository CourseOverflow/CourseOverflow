import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./Pages/Auth/Auth";
import Home from "./Pages/Home/Home";
import MyList from "./Pages/MyList/MyList";
import CreatePlaylist from "./Pages/CreatePlaylist/CreatePlaylist";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import Footer from "./Components/Footer/Footer";
import styles from "./App.module.css";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <BrowserRouter>
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex mr-0">
        <Sidebar isOpen={sidebarOpen} />
        <div
          className={
            sidebarOpen
              ? styles["margin-correction-open"]
              : styles["margin-correction-closed"]
          }
        >
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/home" element={<Home />} />
            <Route path="/create" element={<CreatePlaylist />} />
            <Route path="/list" element={<MyList />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
