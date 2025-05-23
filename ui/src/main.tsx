import { createRoot } from "react-dom/client";
import "./index.css";
import { Routes, Route } from "react-router";
import { HomePage } from "./pages";
import { Providers } from "./providers";

createRoot(document.getElementById("root")!).render(
  <Providers>
    <Routes>
      <Route index element={<HomePage />} />
    </Routes>
  </Providers>
);
