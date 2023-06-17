// vite.config.js
import { defineConfig } from "file:///C:/Users/enzom/Desktop/ECF/newserver/client/node_modules/.pnpm/vite@4.3.4/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/enzom/Desktop/ECF/newserver/client/node_modules/.pnpm/@vitejs+plugin-react@4.0.0_vite@4.3.4/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/dataApi": {
        target: "http://localhost:3000/",
        ws: true
      },
      "/cardApi": {
        target: "http://localhost:3000/",
        ws: true
      },
      "/authLogin": {
        target: "http://localhost:3000/",
        ws: true
      },
      "/authReservation": {
        target: "http://localhost:3000/",
        ws: true
      },
      "/logout": {
        target: "http://localhost:3000/",
        ws: true
      },
      "/deleteAccount": {
        target: "http://localhost:3000/",
        ws: true
      },
      "/createAccount": {
        target: "http://localhost:3000/",
        ws: true
      },
      "/adminImageDeleted": {
        target: "http://localhost:3000/",
        ws: true
      },
      "/adminImageEdited": {
        target: "http://localhost:3000/",
        ws: true
      },
      "/adminHours": {
        target: "http://localhost:3000/",
        ws: true
      },
      "/res": {
        target: "http://localhost:3000/",
        ws: true
      },
      "/updateCarte": {
        target: "http://localhost:3000/",
        ws: true
      },
      "/reservation": {
        target: "http://localhost:3000/",
        ws: true
      },
      "/updateProfil": {
        target: "http://localhost:3000/",
        ws: true
      },
      "/deleteReservation": {
        target: "http://localhost:3000/",
        ws: true
      },
      "/post": {
        target: "http://localhost:3000/",
        ws: true
      },
      "/postVerify": {
        target: "http://localhost:3000/",
        ws: true
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxlbnpvbVxcXFxEZXNrdG9wXFxcXEVDRlxcXFxuZXdzZXJ2ZXJcXFxcY2xpZW50XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxlbnpvbVxcXFxEZXNrdG9wXFxcXEVDRlxcXFxuZXdzZXJ2ZXJcXFxcY2xpZW50XFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9lbnpvbS9EZXNrdG9wL0VDRi9uZXdzZXJ2ZXIvY2xpZW50L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpXSxcbiAgc2VydmVyOiB7XG4gICAgcHJveHk6IHtcbiAgICAgIFwiL2RhdGFBcGlcIjoge1xuICAgICAgICB0YXJnZXQ6IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwL1wiLFxuICAgICAgICB3czogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICBcIi9jYXJkQXBpXCI6IHtcbiAgICAgICAgdGFyZ2V0OiBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9cIixcbiAgICAgICAgd3M6IHRydWUsXG4gICAgICB9LFxuICAgICAgXCIvYXV0aExvZ2luXCI6IHtcbiAgICAgICAgdGFyZ2V0OiBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9cIixcbiAgICAgICAgd3M6IHRydWUsXG4gICAgICB9LFxuICAgICAgXCIvYXV0aFJlc2VydmF0aW9uXCI6IHtcbiAgICAgICAgdGFyZ2V0OiBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9cIixcbiAgICAgICAgd3M6IHRydWUsXG4gICAgICB9LFxuICAgICAgXCIvbG9nb3V0XCI6IHtcbiAgICAgICAgdGFyZ2V0OiBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9cIixcbiAgICAgICAgd3M6IHRydWUsXG4gICAgICB9LFxuICAgICAgXCIvZGVsZXRlQWNjb3VudFwiOiB7XG4gICAgICAgIHRhcmdldDogXCJodHRwOi8vbG9jYWxob3N0OjMwMDAvXCIsXG4gICAgICAgIHdzOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIFwiL2NyZWF0ZUFjY291bnRcIjoge1xuICAgICAgICB0YXJnZXQ6IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwL1wiLFxuICAgICAgICB3czogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICBcIi9hZG1pbkltYWdlRGVsZXRlZFwiOiB7XG4gICAgICAgIHRhcmdldDogXCJodHRwOi8vbG9jYWxob3N0OjMwMDAvXCIsXG4gICAgICAgIHdzOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIFwiL2FkbWluSW1hZ2VFZGl0ZWRcIjoge1xuICAgICAgICB0YXJnZXQ6IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwL1wiLFxuICAgICAgICB3czogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICBcIi9hZG1pbkhvdXJzXCI6IHtcbiAgICAgICAgdGFyZ2V0OiBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9cIixcbiAgICAgICAgd3M6IHRydWUsXG4gICAgICB9LFxuICAgICAgXCIvcmVzXCI6IHtcbiAgICAgICAgdGFyZ2V0OiBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9cIixcbiAgICAgICAgd3M6IHRydWUsXG4gICAgICB9LFxuICAgICAgXCIvdXBkYXRlQ2FydGVcIjoge1xuICAgICAgICB0YXJnZXQ6IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwL1wiLFxuICAgICAgICB3czogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICBcIi9yZXNlcnZhdGlvblwiOiB7XG4gICAgICAgIHRhcmdldDogXCJodHRwOi8vbG9jYWxob3N0OjMwMDAvXCIsXG4gICAgICAgIHdzOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIFwiL3VwZGF0ZVByb2ZpbFwiOiB7XG4gICAgICAgIHRhcmdldDogXCJodHRwOi8vbG9jYWxob3N0OjMwMDAvXCIsXG4gICAgICAgIHdzOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIFwiL2RlbGV0ZVJlc2VydmF0aW9uXCI6IHtcbiAgICAgICAgdGFyZ2V0OiBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9cIixcbiAgICAgICAgd3M6IHRydWUsXG4gICAgICB9LFxuICAgICAgXCIvcG9zdFwiOiB7XG4gICAgICAgIHRhcmdldDogXCJodHRwOi8vbG9jYWxob3N0OjMwMDAvXCIsXG4gICAgICAgIHdzOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIFwiL3Bvc3RWZXJpZnlcIjoge1xuICAgICAgICB0YXJnZXQ6IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwL1wiLFxuICAgICAgICB3czogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFpVSxTQUFTLG9CQUFvQjtBQUM5VixPQUFPLFdBQVc7QUFHbEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLEVBQ2pCLFFBQVE7QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMLFlBQVk7QUFBQSxRQUNWLFFBQVE7QUFBQSxRQUNSLElBQUk7QUFBQSxNQUNOO0FBQUEsTUFDQSxZQUFZO0FBQUEsUUFDVixRQUFRO0FBQUEsUUFDUixJQUFJO0FBQUEsTUFDTjtBQUFBLE1BQ0EsY0FBYztBQUFBLFFBQ1osUUFBUTtBQUFBLFFBQ1IsSUFBSTtBQUFBLE1BQ047QUFBQSxNQUNBLG9CQUFvQjtBQUFBLFFBQ2xCLFFBQVE7QUFBQSxRQUNSLElBQUk7QUFBQSxNQUNOO0FBQUEsTUFDQSxXQUFXO0FBQUEsUUFDVCxRQUFRO0FBQUEsUUFDUixJQUFJO0FBQUEsTUFDTjtBQUFBLE1BQ0Esa0JBQWtCO0FBQUEsUUFDaEIsUUFBUTtBQUFBLFFBQ1IsSUFBSTtBQUFBLE1BQ047QUFBQSxNQUNBLGtCQUFrQjtBQUFBLFFBQ2hCLFFBQVE7QUFBQSxRQUNSLElBQUk7QUFBQSxNQUNOO0FBQUEsTUFDQSxzQkFBc0I7QUFBQSxRQUNwQixRQUFRO0FBQUEsUUFDUixJQUFJO0FBQUEsTUFDTjtBQUFBLE1BQ0EscUJBQXFCO0FBQUEsUUFDbkIsUUFBUTtBQUFBLFFBQ1IsSUFBSTtBQUFBLE1BQ047QUFBQSxNQUNBLGVBQWU7QUFBQSxRQUNiLFFBQVE7QUFBQSxRQUNSLElBQUk7QUFBQSxNQUNOO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDTixRQUFRO0FBQUEsUUFDUixJQUFJO0FBQUEsTUFDTjtBQUFBLE1BQ0EsZ0JBQWdCO0FBQUEsUUFDZCxRQUFRO0FBQUEsUUFDUixJQUFJO0FBQUEsTUFDTjtBQUFBLE1BQ0EsZ0JBQWdCO0FBQUEsUUFDZCxRQUFRO0FBQUEsUUFDUixJQUFJO0FBQUEsTUFDTjtBQUFBLE1BQ0EsaUJBQWlCO0FBQUEsUUFDZixRQUFRO0FBQUEsUUFDUixJQUFJO0FBQUEsTUFDTjtBQUFBLE1BQ0Esc0JBQXNCO0FBQUEsUUFDcEIsUUFBUTtBQUFBLFFBQ1IsSUFBSTtBQUFBLE1BQ047QUFBQSxNQUNBLFNBQVM7QUFBQSxRQUNQLFFBQVE7QUFBQSxRQUNSLElBQUk7QUFBQSxNQUNOO0FBQUEsTUFDQSxlQUFlO0FBQUEsUUFDYixRQUFRO0FBQUEsUUFDUixJQUFJO0FBQUEsTUFDTjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
