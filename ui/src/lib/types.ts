export interface NFT {
  id: string;
  name: string;
  price: number;
  tags: string[];
  image: string;
  description: string;
  creator: string;
  createdAt: Date;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
  isObfuscated: boolean;
  revealConditions?: string;
  proof?: string;
}

