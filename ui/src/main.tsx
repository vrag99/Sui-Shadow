import { createRoot } from "react-dom/client";
import "./index.css";
import "@mysten/dapp-kit/dist/index.css";
import { Routes, Route } from "react-router";
import { Dashboard, HomePage } from "./pages";
import { Providers } from "./providers";

createRoot(document.getElementById("root")!).render(
  <Providers>
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </Providers>
);
