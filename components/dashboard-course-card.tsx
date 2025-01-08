"use client"

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import type { Course, Module } from '@/types/course'

interface DashboardCourseCardProps {
    id: string
    title: string
    description: string
    thumbnail?: string
    instructor?: string
    modules: Module[]
    progress?: {
        completedLessons: string[]
        lastLesson?: string
    }
}

export function DashboardCourseCard({
    id,
    title,
    description,
    thumbnail,
    instructor,
    modules,
    progress
}: DashboardCourseCardProps) {
    const router = useRouter()

    // Calculate progress percentage
    const totalLessons = modules.reduce((acc, module) => acc + module.lessons.length, 0)
    const completedCount = progress?.completedLessons?.length || 0
    const progressPercentage = totalLessons > 0
        ? Math.round((completedCount / totalLessons) * 100)
        : 0

    const handleContinueLearning = () => {
        if (!modules?.length) {
            return router.push(`/dashboard/course?id=${id}`)
        }

        // If there's a last lesson viewed, go to that
        if (progress?.lastLesson) {
            return router.push(`/dashboard/course?id=${id}&lessonId=${progress.lastLesson}`)
        }

        // Otherwise, start from the first lesson
        const firstModule = modules[0]
        const firstLesson = firstModule.lessons[0]
        router.push(`/dashboard/course?id=${id}&lessonId=${firstLesson.id}`)
    }

    return (
        <Card className="overflow-hidden">
            <div className="aspect-video relative bg-accent/10">
                {thumbnail ? (
                    <Image
                        src={thumbnail}
                        alt={title}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <BookOpen className="h-12 w-12 text-accent/50" />
                    </div>
                )}
            </div>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-4">{description}</p>
                <div className="space-y-2">
                    <Progress value={progressPercentage} className="h-2" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Progress</span>
                        <span>{progressPercentage}%</span>
                    </div>
                </div>
                <Button
                    onClick={handleContinueLearning}
                    className="w-full mt-4"
                >
                    {progressPercentage > 0 ? 'Continue Learning' : 'Start Course'}
                </Button>
            </CardContent>
        </Card>
    )
} 