import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "tailwindcss/tailwind.css";
import { PositionProvider } from "./components/usePositions";

ReactDOM.render(
  <React.StrictMode>
    <PositionProvider>
      <App />
    </PositionProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
