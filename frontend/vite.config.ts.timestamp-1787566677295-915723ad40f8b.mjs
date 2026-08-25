// vite.config.ts
import { defineConfig } from "file:///C:/Users/Eliazar/Desktop/TECHIVE%20IT%20SOLTIONS/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Eliazar/Desktop/TECHIVE%20IT%20SOLTIONS/node_modules/@vitejs/plugin-react/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Local dev only — production uses vercel.json rewrites instead.
      "/api": "http://localhost:5000"
    }
  },
  build: {
    rollupOptions: {
      output: {
        // Three.js gets its own cacheable chunk, separate from the main
        // bundle — combined with lazy-loading Hero3D, this keeps first
        // paint fast even though the 3D scene is fairly heavy.
        manualChunks: {
          three: ["three", "@react-three/fiber", "@react-three/drei"]
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxFbGlhemFyXFxcXERlc2t0b3BcXFxcVEVDSElWRSBJVCBTT0xUSU9OU1xcXFxhcHBzXFxcXHdlYlwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcRWxpYXphclxcXFxEZXNrdG9wXFxcXFRFQ0hJVkUgSVQgU09MVElPTlNcXFxcYXBwc1xcXFx3ZWJcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL0VsaWF6YXIvRGVza3RvcC9URUNISVZFJTIwSVQlMjBTT0xUSU9OUy9hcHBzL3dlYi92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpXSxcbiAgc2VydmVyOiB7XG4gICAgcHJveHk6IHtcbiAgICAgIC8vIExvY2FsIGRldiBvbmx5IFx1MjAxNCBwcm9kdWN0aW9uIHVzZXMgdmVyY2VsLmpzb24gcmV3cml0ZXMgaW5zdGVhZC5cbiAgICAgIFwiL2FwaVwiOiBcImh0dHA6Ly9sb2NhbGhvc3Q6NTAwMFwiLFxuICAgIH0sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIC8vIFRocmVlLmpzIGdldHMgaXRzIG93biBjYWNoZWFibGUgY2h1bmssIHNlcGFyYXRlIGZyb20gdGhlIG1haW5cbiAgICAgICAgLy8gYnVuZGxlIFx1MjAxNCBjb21iaW5lZCB3aXRoIGxhenktbG9hZGluZyBIZXJvM0QsIHRoaXMga2VlcHMgZmlyc3RcbiAgICAgICAgLy8gcGFpbnQgZmFzdCBldmVuIHRob3VnaCB0aGUgM0Qgc2NlbmUgaXMgZmFpcmx5IGhlYXZ5LlxuICAgICAgICBtYW51YWxDaHVua3M6IHtcbiAgICAgICAgICB0aHJlZTogW1widGhyZWVcIiwgXCJAcmVhY3QtdGhyZWUvZmliZXJcIiwgXCJAcmVhY3QtdGhyZWUvZHJlaVwiXSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFtVyxTQUFTLG9CQUFvQjtBQUNoWSxPQUFPLFdBQVc7QUFFbEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLEVBQ2pCLFFBQVE7QUFBQSxJQUNOLE9BQU87QUFBQTtBQUFBLE1BRUwsUUFBUTtBQUFBLElBQ1Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFJTixjQUFjO0FBQUEsVUFDWixPQUFPLENBQUMsU0FBUyxzQkFBc0IsbUJBQW1CO0FBQUEsUUFDNUQ7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
