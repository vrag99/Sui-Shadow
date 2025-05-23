import { create } from 'zustand';

export type OpenIdProvider = 'Google';
export type AccountData = {
  provider: OpenIdProvider;
  userAddr: string;
  zkProofs: unknown;
  ephemeralPrivateKey: string;
  userSalt: string;
  sub: string;
  aud: string;
  maxEpoch: number;
};

export type AuthState = {
  loggedIn: boolean;
  accounts: AccountData[];
  balances: Map<string, number>;
  setLoggedIn: (loggedIn: boolean) => void;
  setAccounts: (accounts: AccountData[]) => void;
  clearAccounts: () => void;
  setBalances: (balances: Map<string, number>) => void;
  clearBalances: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  loggedIn: false,
  accounts: [],
  balances: new Map(),
  setLoggedIn: (loggedIn) => set({ loggedIn }),
  setAccounts: (accounts) => set({ accounts }),
  clearAccounts: () => set({ accounts: [] }),
  setBalances: (balances) => set({ balances }),
  clearBalances: () => set({ balances: new Map() }),
})); 