import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { SystemInfoProvider } from "./components/SystemInfoProvider";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SystemInfoProvider>
      <App />
    </SystemInfoProvider>
  </React.StrictMode>
);
