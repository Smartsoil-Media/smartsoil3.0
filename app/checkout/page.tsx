import { Suspense } from 'react'
import Link from 'next/link'
import { Leaf, ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { CheckoutForm } from './checkout-form'

function CheckoutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-card">
        <Link className="flex items-center justify-center" href="/">
          <Leaf className="h-8 w-8 mr-2 text-accent" />
          <span className="font-bold text-2xl text-foreground">Smartsoil</span>
        </Link>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/marketplace">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Marketplace
          </Link>
        </Button>
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <CheckoutForm />
        </Suspense>
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

export default CheckoutPage

