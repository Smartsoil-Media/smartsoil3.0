"use client"

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BookOpen } from 'lucide-react'
import { Button } from "@/components/ui/button"
import type { Course } from '@/types/course'

interface DashboardCourseCardProps {
    id: string
    title: string
    description: string
    instructor: string
    thumbnail?: string
    modules: Course['modules']
    progress?: {
        completedLessons: string[]
        lastLesson?: string
    }
}

export function DashboardCourseCard({
    id,
    title,
    description,
    instructor,
    thumbnail,
    modules,
    progress
}: DashboardCourseCardProps) {
    const router = useRouter()
    const totalLessons = modules.reduce((acc, module) => acc + module.lessons.length, 0)
    const completedLessons = progress?.completedLessons.length || 0
    const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0

    const handleContinueLearning = () => {
        if (!modules.length) {
            console.error('No modules available')
            return
        }

        // Use a simple query parameter instead of dynamic routes
        router.push(`/dashboard/course?id=${id}`)
    }

    return (
        <Card className="overflow-hidden">
            <CardHeader className="border-b border-border p-0">
                <div className="aspect-video relative bg-accent/10">
                    {thumbnail ? (
                        <Image
                            src={thumbnail}
                            alt={title}
                            fill
                            priority
                            className="object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <BookOpen className="h-12 w-12 text-accent/50" />
                        </div>
                    )}
                </div>
            </CardHeader>
            <CardContent className="p-6">
                <CardTitle className="mb-2 line-clamp-1">{title}</CardTitle>
                <CardDescription className="mb-4 line-clamp-2">{description}</CardDescription>

                <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{instructor}</span>
                        <span className="font-medium">
                            {Math.round(progressPercentage)}% Complete
                        </span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                </div>

                <Button
                    onClick={handleContinueLearning}
                    className="w-full"
                    variant="default"
                >
                    Continue Learning
                </Button>
            </CardContent>
        </Card>
    )
} 