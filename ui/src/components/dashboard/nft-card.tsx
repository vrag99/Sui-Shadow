import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import type { NFT } from "@/lib/sample-data"

interface NFTCardProps {
  nft: NFT
  onClick: () => void
  delay?: number
}

export function NFTCard({ nft, onClick, delay = 0 }: NFTCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className="cursor-pointer"
      onClick={onClick}
    >
      <Card className="overflow-hidden border bg-card hover:shadow-lg transition-shadow">
        <CardContent className="p-0">
          <div className="relative aspect-square">
            <img src={nft.image || "/vite.svg"} alt={nft.name} className="object-cover" />
            {nft.isObfuscated && (
              <div className="absolute inset-0 bg-background/80">
                <div className="h-full w-full grid grid-cols-8 grid-rows-8">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div
                      key={i}
                      className={`${
                        [5, 12, 19, 28, 35, 44, 51, 58].includes(i) ? "bg-muted-foreground/20" : "bg-background"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
            <div className="absolute top-2 right-2">
              <Badge variant={
                nft.rarity === 'Common' ? 'common' :
                nft.rarity === 'Rare' ? 'rare' :
                nft.rarity === 'Epic' ? 'epic' :
                nft.rarity === 'Legendary' ? 'legendary' : 'default'
              } className="text-xs">
                {nft.rarity}
              </Badge>
            </div>
            {nft.isObfuscated && (
              <div className="absolute top-2 left-2">
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs text-primary font-medium">Encrypted</span>
                </div>
              </div>
            )}
          </div>
          <div className="p-4 space-y-3">
            <div>
              <h3 className="font-semibold text-lg">{nft.name}</h3>
              <p className="text-sm text-muted-foreground">by {nft.creator}</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold text-primary">{nft.price} SUI</div>
            </div>
            <div className="flex flex-wrap gap-1">
              {nft.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {nft.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{nft.tags.length - 3}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
