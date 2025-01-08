"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Leaf, CheckCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface OrderItem {
  name: string
  quantity: number
  size: string
  price: number
}

interface Order {
  id: string
  total: number
  items: OrderItem[]
}

export default function ThankYouPage() {
  const [order, setOrder] = useState<Order | null>(null)

  useEffect(() => {
    // Simulate fetching the most recent order
    const fetchOrder = () => {
      const mockOrder: Order = {
        id: "ORDER123",
        total: 1000,
        items: [
          { name: "Red Grass", quantity: 2, size: "5kg", price: 300 },
          { name: "Kangaroo Grass", quantity: 1, size: "10kg", price: 550 }
        ]
      }
      setOrder(mockOrder)
    }

    fetchOrder()
  }, [])

  if (!order) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-card">
        <Link className="flex items-center justify-center" href="/">
          <Leaf className="h-8 w-8 mr-2 text-accent" />
          <span className="font-bold text-2xl text-foreground">Smartsoil</span>
        </Link>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <CardTitle className="text-2xl">Thank You for Your Order!</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-4">Your order has been successfully placed.</p>
            <p className="font-semibold mb-2">Order Details:</p>
            <p className="mb-4">Order ID: {order.id}</p>
            <div className="space-y-2">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span>{item.name} ({item.size}) x{item.quantity}</span>
                  <span>${item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
      <footer className="w-full py-6 bg-card text-foreground">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-muted-foreground">
            © 2024 Smartsoil. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

