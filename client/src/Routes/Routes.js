// import React from 'react'
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Auth from "../Pages/Auth/Auth";
// import Home from "../Pages/Home/Home";
// import MyList from "../Pages/MyList/MyList";
// import CreatePlaylist from "../Pages/CreatePlaylist/CreatePlaylist";
// import Header from "../Components/Header/Header";
// import Sidebar from "../Components/Sidebar/Sidebar";
// import Footer from "../Components/Footer/Footer";

// const Routes = () => {
//   return (
//     <BrowserRouter>
//         <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
//         <div className="flex mr-0">
//           <Sidebar isOpen={sidebarOpen} />
//           <div className={styles.blocked}></div>
//           <div
//             className={
//               sidebarOpen
//                 ? styles["margin-correction-open"]
//                 : styles["margin-correction-closed"]
//             }
//           >
//             <Routes>
//               <Route
//                 path="/"
//                 element={
//                   <>
//                     <Blocker />
//                     <Auth />
//                   </>
//                 }
//               />
//               <Route
//                 path="/home"
//                 element={
//                   <>
//                     <Blocker />
//                     <Home sidebarOpen={sidebarOpen} />
//                   </>
//                 }
//               />
//               <Route
//                 path="/create"
//                 element={
//                   <>
//                     <Blocker />
//                     <CreatePlaylist />
//                   </>
//                 }
//               />
//               <Route
//                 path="/list"
//                 element={
//                   <>
//                     <Blocker />
//                     <MyList />
//                   </>
//                 }
//               />
//             </Routes>
//             <Footer />
//           </div>
//         </div>
//       </BrowserRouter>
//   )
// }

// export default Routes
