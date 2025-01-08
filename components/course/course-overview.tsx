"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'
import type { Course } from '@/types/course'

interface CourseOverviewProps {
    course: Course
}

export function CourseOverview({ course }: CourseOverviewProps) {
    const router = useRouter()
    const { userProfile } = useAuth()

    useEffect(() => {
        if (!userProfile) {
            router.push('/login')
        }
    }, [userProfile, router])

    if (!userProfile) {
        return <div>Loading...</div>
    }

    return (
        <div className="container mx-auto py-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
                <p className="text-muted-foreground mb-8">{course.description}</p>

                <div className="space-y-6">
                    {course.modules.map((module) => (
                        <Card key={module.id}>
                            <CardHeader>
                                <CardTitle>{module.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {module.lessons.map((lesson) => (
                                        <button
                                            key={lesson.id}
                                            onClick={() => router.push('/dashboard/mycourses')}
                                            className="block w-full p-4 text-left rounded-lg hover:bg-accent/5"
                                        >
                                            <div className="font-medium">{lesson.title}</div>
                                            <p className="text-sm text-muted-foreground">
                                                {lesson.description}
                                            </p>
                                        </button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
} 