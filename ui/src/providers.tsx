import { BrowserRouter } from "react-router";
import { ThemeProvider } from "./components/theme-provider";
import { WalletProvider } from "@suiet/wallet-kit";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <WalletProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </WalletProvider>
    </ThemeProvider>
  );
};
