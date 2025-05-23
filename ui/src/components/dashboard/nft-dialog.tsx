"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import { CheckCircle, Copy, Eye, Lock, Shield } from "lucide-react"
import type { NFT } from "@/lib/sample-data"
import { generateProof } from "@/lib/sample-data"

interface NFTDialogProps {
  nft: NFT | null
  open: boolean
  onOpenChange: (open: boolean) => void
  isMarketplace?: boolean
}

export function NFTDialog({ nft, open, onOpenChange, isMarketplace = true }: NFTDialogProps) {
  const [isVerifying, setIsVerifying] = useState(false)
  const [proof, setProof] = useState<string | null>(null)
  const [showProof, setShowProof] = useState(false)
  const [isBuying, setIsBuying] = useState(false)

  if (!nft) return null

  const handleVerify = async () => {
    setIsVerifying(true)
    // Simulate verification process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    const generatedProof = generateProof()
    setProof(generatedProof)
    setIsVerifying(false)
    setShowProof(true)
  }

  const handleBuy = async () => {
    setIsBuying(true)
    // Simulate purchase process
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsBuying(false)
    onOpenChange(false)
    // Here you would typically handle the actual purchase
  }

  const copyProof = () => {
    if (nft.proof || proof) {
      navigator.clipboard.writeText(nft.proof || proof || "")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{nft.name}</DialogTitle>
          <DialogDescription>
            Created by {nft.creator} • {nft.createdAt.toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg overflow-hidden border">
              <img src={nft.image || "/placeholder.svg"} alt={nft.name} className="object-cover" />
              {nft.isObfuscated && (
                <div className="absolute inset-0 bg-background/80">
                  <div className="h-full w-full grid grid-cols-8 grid-rows-8">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.1, delay: i * 0.01 }}
                        className={`${
                          [5, 12, 19, 28, 35, 44, 51, 58].includes(i) ? "bg-muted-foreground/20" : "bg-background"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
              {nft.isObfuscated && (
                <div className="absolute top-3 left-3">
                  <div className="flex items-center gap-2 bg-background/90 rounded-full px-3 py-1">
                    <Lock className="h-3 w-3 text-primary" />
                    <span className="text-xs text-primary font-medium">Encrypted</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {nft.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Price</span>
                <Badge variant="secondary">{nft.rarity}</Badge>
              </div>
              <div className="text-3xl font-bold text-primary">{nft.price} SUI</div>
            </div>

            <Separator />

            <div>
              <h4 className="font-semibold mb-2">Description</h4>
              <p className="text-sm text-muted-foreground">{nft.description}</p>
            </div>

            {nft.revealConditions && (
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Reveal Conditions
                </h4>
                <p className="text-sm text-muted-foreground">{nft.revealConditions}</p>
              </div>
            )}

            {!isMarketplace && nft.proof && (
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Ownership Proof
                </h4>
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <code className="text-xs font-mono break-all">
                      {nft.proof.slice(0, 20)}...{nft.proof.slice(-20)}
                    </code>
                    <Button variant="ghost" size="sm" onClick={copyProof} className="ml-2">
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {isMarketplace && (
              <div className="space-y-4">
                {showProof && proof && (
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="space-y-2">
                        <p>Verification successful! Proof generated:</p>
                        <div className="bg-muted rounded p-2">
                          <code className="text-xs font-mono break-all">
                            {proof.slice(0, 20)}...{proof.slice(-20)}
                          </code>
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Button onClick={handleVerify} disabled={isVerifying || !!proof} className="w-full" variant="outline">
                    {isVerifying ? "Verifying..." : proof ? "Verified ✓" : "Verify Ownership"}
                  </Button>

                  <Button onClick={handleBuy} disabled={!proof || isBuying} className="w-full">
                    {isBuying ? "Processing..." : `Buy for ${nft.price} SUI`}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
