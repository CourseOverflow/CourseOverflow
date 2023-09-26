import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./Pages/Auth";
import Home from "./Pages/Home";
import MyList from "./Pages/MyList";
import CreatePlaylist from "./Pages/CreatePlaylist";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Sidebar>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create" element={<CreatePlaylist />} />
          <Route path="/list" element={<MyList />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;
