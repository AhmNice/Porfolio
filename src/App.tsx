import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Root from "./layout/Root";
import Blog from "./pages/Blog";
import Post from "./pages/Post";
import { Toaster } from "react-hot-toast";
import Projects from "./pages/Projects";
import NotFound from "./pages/NotFound";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<Post />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="*" element={<NotFound />} />
      </Route>,
    ),
  );

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1e2117",
            color: "#e2e4d5",
            border: "1px solid rgba(190, 242, 100, 0.2)",
            borderRadius: "12px",
            padding: "10px 14px",
            fontSize: "14px",
            fontFamily: "Geist, sans-serif",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
          },
          success: {
            style: {
              background: "#1e2117",
              color: "#bef264",
              border: "1px solid rgba(190, 242, 100, 0.3)",
            },
            iconTheme: {
              primary: "#bef264",
              secondary: "#1e2117",
            },
          },
          error: {
            style: {
              background: "#1e2117",
              color: "#ffb4ab",
              border: "1px solid rgba(255, 180, 171, 0.3)",
            },
            iconTheme: {
              primary: "#ffb4ab",
              secondary: "#1e2117",
            },
          },
          loading: {
            style: {
              background: "#1e2117",
              color: "#e2e4d5",
              border: "1px solid rgba(190, 242, 100, 0.15)",
            },
          },
        }}
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
