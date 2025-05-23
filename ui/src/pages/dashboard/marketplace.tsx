import { useCurrentAccount, useDisconnectWallet } from "@mysten/dapp-kit";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Lock, ShoppingBag, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { HeroSection } from "@/components/dashboard/hero-section";
import { NFTGrid } from "@/components/dashboard/nft-grid";
import {
  marketplaceNFTs,
  myNFTs,
  sortNFTs,
  sortOptions,
  type SortOption,
} from "@/lib/sample-data";
import { ZkLogin } from "@/components/zk-login/widget";

export function Marketplace() {
  const [activeTab, setActiveTab] = useState("marketplace");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [isLoading, setIsLoading] = useState(true);
  const [sortedMarketplaceNFTs, setSortedMarketplaceNFTs] =
    useState(marketplaceNFTs);
  const [sortedMyNFTs, setSortedMyNFTs] = useState(myNFTs);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Update sorted NFTs when sort option changes
  useEffect(() => {
    setSortedMarketplaceNFTs(sortNFTs(marketplaceNFTs, sortBy));
    setSortedMyNFTs(sortNFTs(myNFTs, sortBy));
  }, [sortBy]);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <Lock className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold tracking-tight">Sui Shadow</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex-1 max-w-md mx-8"
          >
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                  value="marketplace"
                  className="flex items-center gap-2"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Marketplace
                </TabsTrigger>
                <TabsTrigger
                  value="my-nfts"
                  className="flex items-center gap-2"
                >
                  <Wallet className="h-4 w-4" />
                  My NFTs
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>
          <div className="flex gap-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              // className="w-48"
            >
              <Select
                value={sortBy}
                onValueChange={(value: SortOption) => setSortBy(value)}
              >
                <SelectTrigger className="rounded-full">
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>
            <motion.div className="div">
              <ZkLogin loggedOutTrigger={<></>} />
            </motion.div>
          </div>
        </div>
      </header>

      <main>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="marketplace" className="mt-0">
            <HeroSection
              badge="Marketplace"
              title="Discover Confidential NFTs"
              description="Explore a curated collection of encrypted digital assets with hidden features waiting to be revealed."
            />
            <div className="container mx-auto px-4 md:px-6 pb-12">
              <NFTGrid
                nfts={sortedMarketplaceNFTs}
                isLoading={isLoading}
                isMarketplace={true}
              />
            </div>
          </TabsContent>

          <TabsContent value="my-nfts" className="mt-0">
            <HeroSection
              badge="My Collection"
              title="Your NFT Collection"
              description="Manage and view your owned confidential NFTs with full access to revealed content and ownership proofs."
            />
            <div className="container mx-auto px-4 md:px-6 pb-12">
              <NFTGrid
                nfts={sortedMyNFTs}
                isLoading={isLoading}
                isMarketplace={false}
              />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
