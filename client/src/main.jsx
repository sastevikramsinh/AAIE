import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import SmoothScrollProvider from "./components/SmoothScrollProvider.jsx";
import "@fontsource-variable/inter/wght.css";
import "@fontsource/tiro-devanagari-marathi/index.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SmoothScrollProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SmoothScrollProvider>
  </React.StrictMode>,
);

