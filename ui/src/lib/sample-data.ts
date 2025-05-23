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

export const marketplaceNFTs: NFT[] = [
  {
    id: "1",
    name: "Obfuscated Ape #1337",
    price: 2.5,
    tags: ["Mystery", "Ape", "Rare"],
    image: "/vite.svg",
    description:
      "A mysterious ape with hidden features waiting to be revealed.",
    creator: "CryptoArtist",
    createdAt: new Date("2024-01-15"),
    rarity: "Rare",
    isObfuscated: true,
    revealConditions: "Time-based unlock in 3 days",
  },
  {
    id: "2",
    name: "Shadow Punk #0042",
    price: 1.8,
    tags: ["Punk", "Shadow", "Epic"],
    image: "/placeholder.svg?height=300&width=300",
    description: "A cyberpunk character with encrypted accessories.",
    creator: "PixelMaster",
    createdAt: new Date("2024-01-20"),
    rarity: "Epic",
    isObfuscated: true,
    revealConditions: "Purchase required for full reveal",
  },
  {
    id: "3",
    name: "Encrypted Dragon #777",
    price: 5.2,
    tags: ["Dragon", "Legendary", "Fire"],
    image: "/placeholder.svg?height=300&width=300",
    description: "A legendary dragon with hidden powers and encrypted flames.",
    creator: "DragonForge",
    createdAt: new Date("2024-01-10"),
    rarity: "Legendary",
    isObfuscated: true,
    revealConditions: "Ownership verification required",
  },
  {
    id: "4",
    name: "Mystery Box #001",
    price: 0.5,
    tags: ["Mystery", "Box", "Common"],
    image: "/placeholder.svg?height=300&width=300",
    description: "A mystery box containing unknown digital treasures.",
    creator: "MysteryMaker",
    createdAt: new Date("2024-01-25"),
    rarity: "Common",
    isObfuscated: true,
    revealConditions: "Random reveal after purchase",
  },
  {
    id: "5",
    name: "Time Capsule #2024",
    price: 3.1,
    tags: ["Time", "Capsule", "Future"],
    image: "/placeholder.svg?height=300&width=300",
    description: "A time capsule that will reveal its contents in the future.",
    creator: "TimeTraveler",
    createdAt: new Date("2024-01-05"),
    rarity: "Epic",
    isObfuscated: true,
    revealConditions: "Unlocks on January 1, 2025",
  },
  {
    id: "6",
    name: "Cipher Cat #999",
    price: 1.2,
    tags: ["Cat", "Cipher", "Cute"],
    image: "/placeholder.svg?height=300&width=300",
    description: "A cute cat with encrypted patterns and hidden messages.",
    creator: "CatCoder",
    createdAt: new Date("2024-01-18"),
    rarity: "Rare",
    isObfuscated: true,
    revealConditions: "Solve the cipher puzzle",
  },
];

export const myNFTs: NFT[] = [
  {
    id: "owned-1",
    name: "Revealed Ape #1234",
    price: 2.0,
    tags: ["Ape", "Revealed", "Owned"],
    image: "/placeholder.svg?height=300&width=300",
    description: "A fully revealed ape with all features visible.",
    creator: "CryptoArtist",
    createdAt: new Date("2024-01-12"),
    rarity: "Rare",
    isObfuscated: false,
    proof: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890",
  },
  {
    id: "owned-2",
    name: "My Shadow Punk #0001",
    price: 1.5,
    tags: ["Punk", "Shadow", "Owned"],
    image: "/placeholder.svg?height=300&width=300",
    description: "Your personal shadow punk with unique traits.",
    creator: "PixelMaster",
    createdAt: new Date("2024-01-08"),
    rarity: "Epic",
    isObfuscated: false,
    proof: "0x9876543210fedcba0987654321fedcba0987654321fedcba0987654321fedcba",
  },
  {
    id: "owned-3",
    name: "Unlocked Mystery #555",
    price: 0.8,
    tags: ["Mystery", "Unlocked", "Surprise"],
    image: "/placeholder.svg?height=300&width=300",
    description: "A mystery box that has been opened to reveal its contents.",
    creator: "MysteryMaker",
    createdAt: new Date("2024-01-22"),
    rarity: "Common",
    isObfuscated: false,
    proof: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
  },
];

export type SortOption = "price-low" | "price-high" | "newest" | "oldest";

export const sortOptions = [
  { value: "price-low" as SortOption, label: "Price: Low to High" },
  { value: "price-high" as SortOption, label: "Price: High to Low" },
  { value: "newest" as SortOption, label: "Newest First" },
  { value: "oldest" as SortOption, label: "Oldest First" },
];

export function sortNFTs(nfts: NFT[], sortBy: SortOption): NFT[] {
  const sorted = [...nfts];

  switch (sortBy) {
    case "price-low":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-high":
      return sorted.sort((a, b) => b.price - a.price);
    case "newest":
      return sorted.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      );
    case "oldest":
      return sorted.sort(
        (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
      );
    default:
      return sorted;
  }
}

export function generateProof(): string {
  // Simulate proof generation
  const chars = "0123456789abcdef";
  let proof = "0x";
  for (let i = 0; i < 64; i++) {
    proof += chars[Math.floor(Math.random() * chars.length)];
  }
  return proof;
}
