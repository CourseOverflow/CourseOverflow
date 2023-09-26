import { React, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./Pages/Auth";
import Home from "./Pages/Home";
import MyList from "./Pages/MyList";
import CreatePlaylist from "./Pages/CreatePlaylist";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import Footer from "./Components/Footer/Footer";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  return (
    <BrowserRouter>
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen}>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/home" element={<Home />} />
            <Route path="/create" element={<CreatePlaylist />} />
            <Route path="/list" element={<MyList />} />
          </Routes>
        </Sidebar>
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <Home />
          </div>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
