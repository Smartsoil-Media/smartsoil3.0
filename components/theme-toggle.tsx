"use client"

import { Moon } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  return (
    <Button variant="ghost" size="icon">
      <Moon className="h-[1.2rem] w-[1.2rem]" />
      <span className="sr-only">Dark mode</span>
    </Button>
  )
}

