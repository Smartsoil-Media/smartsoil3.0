import Image from "next/image";
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, BookOpen, Sprout, Users } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { MobileNav } from "@/components/mobile-nav"



export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-[family-name:var(--font-geist-sans)]">
      <header className="fixed w-full z-50 px-4 lg:px-6 h-16 flex items-center bg-card/80 backdrop-blur-sm">
        <Link className="flex items-center justify-center" href="/">
          <Leaf className="h-8 w-8 mr-2 text-accent" />
          <span className="font-bold text-2xl text-foreground">Smartsoil</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <div className="hidden md:flex gap-4 sm:gap-6">
            <Link className="text-sm font-medium hover:text-accent text-foreground" href="/courses">
              Courses
            </Link>
            <Link className="text-sm font-medium hover:text-accent text-foreground" href="/marketplace">
              Marketplace
            </Link>
            <Link className="text-sm font-medium hover:text-accent text-foreground" href="/about">
              About
            </Link>
            <Link className="text-sm font-medium hover:text-accent text-foreground" href="/login">
              Login
            </Link>
            <Button asChild variant="secondary" size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
          <MobileNav />
        </nav>
      </header>
      <main className="flex-1">
        <section className="relative w-full min-h-screen flex items-center justify-center">
          <Image
            src="/images/hero-image.jpg"
            alt="Regenerative farming landscape"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Empowering Regenerative Farming
                </h1>
                <p className="mx-auto max-w-[700px] text-white/90 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Smartsoil provides expert-led online courses to help you master regenerative farming techniques and grow healthier, more sustainable crops.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href="/courses">Explore Courses</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                  <Link href="/signup">Join Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-foreground">Why Choose Smartsoil?</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground">
                    <BookOpen className="mr-2 h-6 w-6 text-accent" />
                    Expert-Led Courses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Learn from industry leaders like Colin Seis, Judi Earl, and Kevin Elmy. Our comprehensive courses cover soil health, crop rotation, and sustainable practices.</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground">
                    <Sprout className="mr-2 h-6 w-6 text-accent" />
                    Practical Techniques
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Learn practical, hands-on techniques that you can implement right away. We&apos;ll guide you through each step of the regenerative farming journey.</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground">
                    <Users className="mr-2 h-6 w-6 text-accent" />
                    Community Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Join a community of like-minded farmers. Share experiences, ask questions, and grow together in our exclusive online forum.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <Image
                alt="Regenerative Farming"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height="310"
                src="/images/image2.jpg"
                width="550"
              />
              <div className="flex flex-col justify-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-foreground">About Regenerative Farming</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Regenerative farming is an approach to agriculture that focuses on improving soil health, increasing biodiversity, and enhancing ecosystem services. By adopting these practices, farmers can produce nutritious food while also sequestering carbon and improving the environment.
                </p>
                <ul className="grid gap-2 py-4">
                  <li className="flex items-center text-muted-foreground">
                    <Leaf className="mr-2 h-5 w-5 text-accent" />
                    <span>Improve soil health</span>
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <Leaf className="mr-2 h-5 w-5 text-accent" />
                    <span>Increase biodiversity</span>
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <Leaf className="mr-2 h-5 w-5 text-accent" />
                    <span>Reduce chemical inputs</span>
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <Leaf className="mr-2 h-5 w-5 text-accent" />
                    <span>Enhance water retention</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section id="cta" className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-foreground">Start Your Regenerative Journey</h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join Smartsoil today and become part of the regenerative farming movement. Learn, grow, and make a positive impact on the environment.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="flex-1 bg-background border-input"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground">Subscribe</Button>
                </form>
                <p className="text-xs text-muted-foreground">
                  Subscribe to our newsletter for updates and exclusive offers.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 bg-card text-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-2 sm:flex-row items-center">
            <p className="text-xs text-muted-foreground">© 2024 Smartsoil. All rights reserved.</p>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
              <Link className="text-xs hover:underline hover:underline-offset-4 text-muted-foreground" href="#">
                Terms of Service
              </Link>
              <Link className="text-xs hover:underline hover:underline-offset-4 text-muted-foreground" href="#">
                Privacy Policy
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}

