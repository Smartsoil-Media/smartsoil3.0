"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Leaf, Check, Users, Trophy, Timer } from 'lucide-react'
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CourseCard } from '@/components/course-card'
import type { Course } from '@/types/course'

interface CoursesContentProps {
    courses: Course[]
}

export function CoursesContent({ courses }: CoursesContentProps) {
    const [isYearly, setIsYearly] = useState(false)

    const monthlyPrice = 49.99
    const yearlyPrice = 399

    const features = [
        "Access to all courses",
        "Expert-led instruction",
        "Community support",
        "Course completion certificates",
        "Regular content updates"
    ]

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative w-full min-h-[60vh] flex items-center justify-center">
                <Image
                    src="/images/cover-cropping.jpg"
                    alt="Regenerative farming education"
                    fill
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="container px-4 md:px-6 relative z-10">
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                                Master Regenerative Agriculture
                            </h1>
                            <p className="mx-auto max-w-[700px] text-zinc-200 md:text-xl">
                                Learn from world-renowned experts and transform your farming practices
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Course Benefits */}
            <section className="w-full py-12 md:py-24 bg-background">
                <div className="container px-4 md:px-6">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <Card className="bg-card border-border">
                            <div className="p-6 space-y-2">
                                <Trophy className="h-12 w-12 text-accent mb-4" />
                                <h3 className="text-xl font-bold">Expert Instructors</h3>
                                <p className="text-muted-foreground">Learn directly from Colin Seis, Judi Earl, and other industry leaders</p>
                            </div>
                        </Card>
                        <Card className="bg-card border-border">
                            <div className="p-6 space-y-2">
                                <Timer className="h-12 w-12 text-accent mb-4" />
                                <h3 className="text-xl font-bold">Self-Paced Learning</h3>
                                <p className="text-muted-foreground">Study at your own pace with lifetime access to all course materials</p>
                            </div>
                        </Card>
                        <Card className="bg-card border-border">
                            <div className="p-6 space-y-2">
                                <Users className="h-12 w-12 text-accent mb-4" />
                                <h3 className="text-xl font-bold">Community Support</h3>
                                <p className="text-muted-foreground">Join a network of farmers practicing regenerative agriculture</p>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Available Courses */}
            <section className="container mx-auto py-16">
                <div className="space-y-4 mb-12">
                    <div className="flex items-center gap-2">
                        <Leaf className="h-6 w-6 text-green-500" />
                        <h2 className="text-3xl font-bold">Available Courses</h2>
                    </div>
                    <p className="text-muted-foreground text-lg max-w-[700px]">
                        Dive deep into regenerative agriculture with our expert-led courses.
                        Each course is designed to give you practical, actionable knowledge.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course) => (
                        <CourseCard key={course.id} {...course} />
                    ))}
                </div>
            </section>

            {/* Testimonials */}
            <section className="w-full py-12 md:py-24 bg-card">
                <div className="container px-4 md:px-6">
                    <h2 className="text-3xl font-bold text-center mb-12">What Our Students Say</h2>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <Card className="bg-background">
                            <div className="p-6">
                                <p className="text-muted-foreground mb-4">&ldquo;The pasture cropping course completely changed how I approach farming. The results have been incredible.&rdquo;</p>
                                <p className="font-semibold">- John D., Western Australia</p>
                            </div>
                        </Card>
                        <Card className="bg-background">
                            <div className="p-6">
                                <p className="text-muted-foreground mb-4">&ldquo;Learning from Colin Seis directly was an invaluable experience. His knowledge and practical advice are outstanding.&rdquo;</p>
                                <p className="font-semibold">- Sarah M., Victoria</p>
                            </div>
                        </Card>
                        <Card className="bg-background">
                            <div className="p-6">
                                <p className="text-muted-foreground mb-4">&ldquo;The community support and networking opportunities have been just as valuable as the course content itself.&rdquo;</p>
                                <p className="font-semibold">- Michael R., Queensland</p>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">Simple, Transparent Pricing</h2>

                    {/* Billing Toggle */}
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <span className={!isYearly ? "font-semibold" : "text-muted-foreground"}>Monthly</span>
                        <Switch
                            checked={isYearly}
                            onCheckedChange={setIsYearly}
                        />
                        <span className={isYearly ? "font-semibold" : "text-muted-foreground"}>Yearly</span>
                    </div>

                    {/* Pricing Card */}
                    <div className="max-w-md mx-auto">
                        <Card className="p-8">
                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-bold mb-4">All Access Pass</h3>
                                <div className="flex items-center justify-center gap-2">
                                    <span className="text-4xl font-bold">
                                        ${isYearly ? yearlyPrice : monthlyPrice}
                                    </span>
                                    <span className="text-muted-foreground">
                                        /{isYearly ? 'year' : 'month'}
                                    </span>
                                </div>
                                {isYearly && (
                                    <div className="text-sm text-green-500 mt-2">
                                        Save ${(monthlyPrice * 12 - yearlyPrice).toFixed(2)} annually
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4 mb-6">
                                {features.map((feature, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <Check className="h-5 w-5 text-green-500" />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <Button className="w-full" size="lg">
                                Get Started
                            </Button>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="w-full py-12 md:py-24 bg-card">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <h2 className="text-3xl font-bold">Ready to Transform Your Farm?</h2>
                        <p className="text-muted-foreground text-lg max-w-[600px]">
                            Join thousands of farmers who are already seeing the benefits of regenerative agriculture.
                        </p>
                        <Button size="lg" className="mt-6">
                            Get Started Today
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}