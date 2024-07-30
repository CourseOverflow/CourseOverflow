import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { setTokens } from "./Config/apiConfig";

const root = ReactDOM.createRoot(document.getElementById("root"));

await setTokens().catch((error) => console.log(error));

root.render(<App />);

// root.render(
//   <React.StrictMode>
//     <GlobalStateProvider>
//       <App />
//     </GlobalStateProvider>
//   </React.StrictMode>
// );
