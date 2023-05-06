import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/dataApi": {
        target: "http://localhost:3000/",
        ws: true,
      },
      "/cardApi": {
        target: "http://localhost:3000/",
        ws: true,
      },
      "/authLogin": {
        target: "http://localhost:3000/",
        ws: true,
      },
      "/auth": {
        target: "http://localhost:3000/",
        ws: true,
      },
      "/logout": {
        target: "http://localhost:3000/",
        ws: true,
      },
      "/deleteAccount": {
        target: "http://localhost:3000/",
        ws: true,
      },
      "/createAccount": {
        target: "http://localhost:3000/",
        ws: true,
      },
      "/adminImageDeleted": {
        target: "http://localhost:3000/",
        ws: true,
      },
      "/adminImageEdited": {
        target: "http://localhost:3000/",
        ws: true,
      },
      "/adminHours": {
        target: "http://localhost:3000/",
        ws: true,
      },
      "/res": {
        target: "http://localhost:3000/",
        ws: true,
      },
      "/updateCarte": {
        target: "http://localhost:3000/",
        ws: true,
      },
      "/reservation": {
        target: "http://localhost:3000/",
        ws: true,
      },
    },
  },
});
