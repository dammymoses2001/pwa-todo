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

// Service worker registration with update handling
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        );

        // Check for service worker updates
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          newWorker.addEventListener("statechange", () => {
            if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
              // New content is available, show reload prompt
              if (confirm("New version available! Click OK to refresh.")) {
                window.location.reload();
              }
            }
          });
        });
      })
      .catch((err) => {
        console.log("ServiceWorker registration failed: ", err);
      });

    // Handle communication with service worker
    navigator.serviceWorker.addEventListener("message", (event) => {
      if (event.data && event.data.type === "CACHE_UPDATED") {
        // Handle cache updates if needed
        console.log("Cache updated:", event.data.url);
      }
    });
  });

  // Handle offline/online status
  window.addEventListener("online", () => {
    console.log("Application is online");
    // You can show an online status notification here
  });

  window.addEventListener("offline", () => {
    console.log("Application is offline");
    // You can show an offline status notification here
  });
}
