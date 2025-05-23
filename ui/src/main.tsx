import { createRoot } from "react-dom/client";
import "./index.css";
import "@mysten/dapp-kit/dist/index.css";
import { Routes, Route } from "react-router";
import { HomePage, Marketplace, MyNfts } from "./pages";
import { Providers } from "./providers";
import { ZkLogin } from "./components/zk-login";

createRoot(document.getElementById("root")!).render(
  <Providers>
    <Routes>
      <Route path="/" element={<ZkLogin />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/dashboard" >
        <Route index element={<Marketplace />} />
        <Route path="my-nfts" element={<MyNfts />} />
      </Route>
    </Routes>
  </Providers>
);
