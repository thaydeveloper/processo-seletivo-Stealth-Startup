// No index.js ou App.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { AppProvider } from "./context/context"; // Se for React >= 18

import App from "./App";

// ReactDOM.render para React < 18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
