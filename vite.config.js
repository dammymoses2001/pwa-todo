import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'public',
      filename: 'sw.js',
      injectRegister: 'auto',
      injectManifest: {
        injectionPoint: 'self.__WB_MANIFEST',
        rollupFormat: 'iife'
      },
      manifest: {
          // caches the assets/icons mentioned (assets/* includes all the assets present in your src/ directory)
          includeAssets: ["favicon.ico", "apple-touch-icon.png", "assets/*"],
          name: "Simplifying Progressive Web App (PWA) Development with Vite: A Beginners Guide",
          short_name: "PWA Guide",
          start_url: "/",
          background_color: "#ffffff",
          theme_color: "#000000",
          icons: [
            {
              src: "/images/icon-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "/images/icon-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
          ],
        },
        workbox: {
          // defining cached files formats
          globPatterns: ["**/*.{js,css,html,ico,png,svg,webmanifest}"],
        },
      })
  ],
});
