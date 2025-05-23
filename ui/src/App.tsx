import { Routes, Route, Navigate, Outlet } from "react-router";
import { HomePage, Marketplace, MyNfts } from "./pages";
import { Providers } from "./providers";
import { useAuthStore } from "./lib/auth-store";

export default function App() {
  const { loggedIn } = useAuthStore();
  return (
    <Providers>
      <Routes>
        <Route
          index
          element={loggedIn ? <Navigate to="/dashboard" /> : <HomePage />}
        />
        <Route
          path="/dashboard"
          element={!loggedIn ? <Navigate to="/" /> : <Outlet />}
        >
          <Route index element={<Marketplace />} />
          <Route path="my-nfts" element={<MyNfts />} />
        </Route>
      </Routes>
    </Providers>
  );
}
