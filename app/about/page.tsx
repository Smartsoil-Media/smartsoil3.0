import Link from 'next/link'
import Image from 'next/image'
import { Leaf, Users, Sprout, Globe } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MobileNav } from "@/components/mobile-nav"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-card">
        <Link className="flex items-center justify-center" href="/">
          <Leaf className="h-8 w-8 mr-2 text-accent" />
          <span className="font-bold text-2xl text-foreground">Smartsoil</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <div className="hidden md:flex gap-4 sm:gap-6">
            <Link className="text-sm font-medium hover:text-accent text-foreground" href="/">
              Home
            </Link>
            <Link className="text-sm font-medium hover:text-accent text-foreground" href="/courses">
              Courses
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
        <section className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-foreground">
                About Smartsoil
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Empowering farmers with regenerative agriculture knowledge since 2019
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <Image
                alt="Smartsoil Founders"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height="310"
                src="/images/img_7526.jpg"
                width="550"
              />
              <div className="flex flex-col justify-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-foreground">Our Story</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Founded in 2019, Smartsoil was born from a passion for sustainable farming and a vision to revolutionize agricultural education. Today, our company is proudly led by two West Australian brothers who share a deep commitment to regenerative agriculture and environmental stewardship.
                </p>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our journey began with a simple idea: to bridge the gap between traditional farming practices and innovative, sustainable techniques. We believe that by empowering farmers with knowledge and tools, we can create a more resilient and eco-friendly agricultural future.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12 text-foreground">Our Mission</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-background border-border">
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground">
                    <Sprout className="mr-2 h-6 w-6 text-accent" />
                    Regenerative Practices
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Promoting farming techniques that restore and enhance ecosystem health.</p>
                </CardContent>
              </Card>
              <Card className="bg-background border-border">
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground">
                    <Users className="mr-2 h-6 w-6 text-accent" />
                    Farmer Education
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Providing accessible, expert-led courses to empower farmers worldwide.</p>
                </CardContent>
              </Card>
              <Card className="bg-background border-border">
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground">
                    <Globe className="mr-2 h-6 w-6 text-accent" />
                    Sustainable Future
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Contributing to global food security and environmental conservation.</p>
                </CardContent>
              </Card>
              <Card className="bg-background border-border">
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground">
                    <Leaf className="mr-2 h-6 w-6 text-accent" />
                    Innovation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Continuously evolving our platform with cutting-edge agricultural research.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12 text-foreground">Our Expert Educators</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Colin Seis</CardTitle>
                  <CardDescription className="text-muted-foreground">Pasture Cropping Pioneer</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src="/images/pasture-cropping.jpg"
                    alt="Colin Seis"
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <p className="text-muted-foreground">Colin Seis is the pioneer of pasture cropping, a revolutionary technique that integrates crop production with perennial pastures. With over 40 years of experience, Colin has transformed the approach to sustainable agriculture.</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Judi Earl</CardTitle>
                  <CardDescription className="text-muted-foreground">Grazing Management Expert</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src="/images/grazing-management.jpg"
                    alt="Judi Earl"
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <p className="text-muted-foreground">Dr. Judi Earl is a renowned expert in grazing management and pasture ecology. Her research and practical experience have helped countless farmers improve their land productivity and animal health through strategic grazing practices.</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Kevin Elmy</CardTitle>
                  <CardDescription className="text-muted-foreground">Cover Cropping Specialist</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src="/images/cover-cropping.jpg"
                    alt="Kevin Elmy"
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <p className="text-muted-foreground">Kevin Elmy is a leading authority on cover cropping and soil health. His innovative approaches to integrating cover crops have revolutionized soil management practices, helping farmers build resilient and productive agricultural systems.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-foreground">Join Our Community</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Be part of the regenerative agriculture movement. Learn, share, and grow with farmers from around the world.
              </p>
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/signup">Get Started Today</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-6 bg-card text-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-2 sm:flex-row items-center">
            <p className="text-xs text-muted-foreground">© 2024 Smartsoil. All rights reserved.</p>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
              <Link className="text-xs hover:underline underline-offset-4 text-muted-foreground" href="#">
                Terms of Service
              </Link>
              <Link className="text-xs hover:underline underline-offset-4 text-muted-foreground" href="#">
                Privacy Policy
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}

