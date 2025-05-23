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
  accounts: AccountData[];
  balances: Map<string, number>;
  setAccounts: (accounts: AccountData[]) => void;
  clearAccounts: () => void;
  setBalances: (balances: Map<string, number>) => void;
  clearBalances: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  accounts: [],
  balances: new Map(),
  setAccounts: (accounts) => set({ accounts }),
  clearAccounts: () => set({ accounts: [] }),
  setBalances: (balances) => set({ balances }),
  clearBalances: () => set({ balances: new Map() }),
})); 