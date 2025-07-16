import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // This will include Tailwind CSS

// Render the app
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Handle offline/online status
window.addEventListener("online", () => {
  console.log("Application is online");
  // You can show an online status notification here
});

window.addEventListener("offline", () => {
  console.log("Application is offline");
  // You can show an offline status notification here
});
