"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Leaf, ShoppingCart, X, Minus, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MobileNav } from "@/components/mobile-nav"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Quantity = '5kg' | '10kg' | '100kg'

interface SeedProduct {
  id: number
  name: string
  scientificName: string
  description: string
  prices: Record<Quantity, number>
  image: string
}

interface CartItem extends SeedProduct {
  quantity: number
  selectedSize: Quantity
}

const seeds: SeedProduct[] = [
  {
    id: 1,
    name: "Red Grass",
    scientificName: "Bothriochloa macra",
    description: "A warm-season perennial grass native to Australia, known for its drought tolerance and red-tinged foliage.",
    prices: { '5kg': 300, '10kg': 550, '100kg': 5000 },
    image: "/images/red-grass.jpeg"
  },
  {
    id: 2,
    name: "Green Summer Grass",
    scientificName: "Brachiaria miliiformis",
    description: "A robust, fast-growing summer grass that provides excellent ground cover and erosion control.",
    prices: { '5kg': 300, '10kg': 550, '100kg': 5000 },
    image: "/images/green-summer-grass.jpeg"
  },
  {
    id: 3,
    name: "Cotton Panic",
    scientificName: "Themeda triandra",
    description: "A hardy, drought-resistant grass that's an important food source for native wildlife.",
    prices: { '5kg': 300, '10kg': 550, '100kg': 5000 },
    image: "/images/cotton-panic.jpeg"
  },
  {
    id: 4,
    name: "Warrego Summer Grass",
    scientificName: "Paspalidium Distans",
    description: "Grow on a varying range of soils and over a wide geographical area",
    prices: { '5kg': 300, '10kg': 550, '100kg': 5000 },
    image: "/images/green-summer-grass.jpeg"
  }
]

export default function MarketplacePage() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cart, setCart] = useState<CartItem[]>([])

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  const addToCart = (product: SeedProduct, size: Quantity) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(
        item => item.id === product.id && item.selectedSize === size
      )

      if (existingItem) {
        return currentCart.map(item =>
          item.id === product.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...currentCart, { ...product, quantity: 1, selectedSize: size }]
    })
  }

  const updateQuantity = (id: number, size: Quantity, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(id, size)
      return
    }

    setCart(currentCart =>
      currentCart.map(item =>
        item.id === id && item.selectedSize === size
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  const removeFromCart = (id: number, size: Quantity) => {
    setCart(currentCart =>
      currentCart.filter(item => !(item.id === id && item.selectedSize === size))
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-card">
        <Link className="flex items-center justify-center" href="/">
          <Leaf className="h-8 w-8 mr-2 text-accent" />
          <span className="font-bold text-2xl text-foreground">Smartsoil</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4">
          <Button variant="ghost" onClick={() => setIsCartOpen(true)} className="relative">
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Button>
          <MobileNav />
        </nav>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Marketplace</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {seeds.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <div className="relative h-48 mb-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <CardTitle>{product.name}</CardTitle>
                <p className="text-sm italic text-muted-foreground">{product.scientificName}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                <div className="space-y-4">
                  <Select onValueChange={(value) => addToCart(product, value as Quantity)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(product.prices).map(([size, price]) => (
                        <SelectItem key={size} value={size}>
                          {size} - ${price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Your Cart</SheetTitle>
            <SheetDescription>
              Review your items before checkout
            </SheetDescription>
          </SheetHeader>
          <div className="mt-8">
            {cart.length === 0 ? (
              <p className="text-center text-muted-foreground">Your cart is empty</p>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.selectedSize} - ${item.prices[item.selectedSize]}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id, item.selectedSize)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mt-auto pt-4">
            <Button asChild className="w-full" disabled={cart.length === 0}>
              <Link href="/checkout">
                Proceed to Checkout
              </Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

