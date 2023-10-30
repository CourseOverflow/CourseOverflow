import React, { useState } from "react";
import Header from "../Components/Header/Header";
import Sidebar from "../Components/Sidebar/Sidebar";
import Footer from "../Components/Footer/Footer";
import styles from "./MainLayout.module.css";

const MainLayout = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Header
        toggleSidebar={() => {
          setIsOpen(!isOpen);
        }}
        closeSidebar={() => {
          setIsOpen(false);
        }}
      />
      <div className="flex">
        {props.overlay
          ? isOpen && (
              <div
                className={styles.overlay}
                onClick={() => setIsOpen(false)}
              ></div>
            )
          : isOpen && <div className={styles.shiftPageOverlay}></div>}
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div
          className={`${styles.children} ${
            !props.overlay && isOpen && styles.shiftedContent
          }`}
        >
          {props.children}
          <Footer />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
