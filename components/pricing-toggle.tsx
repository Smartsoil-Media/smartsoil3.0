"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface PricingToggleProps {
  onToggle: (isYearly: boolean) => void
}

export function PricingToggle({ onToggle }: PricingToggleProps) {
  const [isYearly, setIsYearly] = useState(false)

  const handleToggle = () => {
    setIsYearly(!isYearly)
    onToggle(!isYearly)
  }

  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="pricing-toggle" className={isYearly ? "text-muted-foreground" : ""}>Monthly</Label>
      <Switch
        id="pricing-toggle"
        checked={isYearly}
        onCheckedChange={handleToggle}
      />
      <Label htmlFor="pricing-toggle" className={!isYearly ? "text-muted-foreground" : ""}>Yearly</Label>
    </div>
  )
}

