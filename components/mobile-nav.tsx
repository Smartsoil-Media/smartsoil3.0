"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from 'lucide-react'

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetTitle className="text-left">Menu</SheetTitle>
        <nav className="flex flex-col gap-4">
          <Link href="/" onClick={() => setOpen(false)} className="text-lg font-medium hover:text-accent">
            Home
          </Link>
          <Link href="/courses" onClick={() => setOpen(false)} className="text-lg font-medium hover:text-accent">
            Courses
          </Link>
          <Link href="/marketplace" onClick={() => setOpen(false)} className="text-lg font-medium hover:text-accent">
            Marketplace
          </Link>
          <Link href="/about" onClick={() => setOpen(false)} className="text-lg font-medium hover:text-accent">
            About
          </Link>
          <Link href="/login" onClick={() => setOpen(false)} className="text-lg font-medium hover:text-accent">
            Login
          </Link>
          <Button asChild className="mt-4">
            <Link href="/signup" onClick={() => setOpen(false)}>Sign Up</Link>
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

