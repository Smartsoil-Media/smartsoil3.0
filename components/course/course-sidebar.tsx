"use client"

import { useRouter } from 'next/navigation'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowLeft, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import type { Course, Lesson } from '@/types/course'
import { cn } from '@/lib/utils'

interface CourseSidebarProps {
    course: Course
    currentLessonId?: string
    onLessonSelect: (lesson: Lesson) => void
    completedLessons: string[]
}

export function CourseSidebar({
    course,
    currentLessonId,
    onLessonSelect,
    completedLessons = []
}: CourseSidebarProps) {
    const router = useRouter()
    const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0)
    const progressPercentage = totalLessons > 0 ? (completedLessons.length / totalLessons) * 100 : 0

    const [expandedModules, setExpandedModules] = useState<string[]>([course.modules[0]?.id || ''])

    const toggleModule = (moduleId: string) => {
        setExpandedModules(current =>
            current.includes(moduleId)
                ? current.filter(id => id !== moduleId)
                : [...current, moduleId]
        )
    }

    const handleLessonClick = (lesson: Lesson) => {
        onLessonSelect(lesson)
        router.push(`/dashboard/course?id=${course.id}&lessonId=${lesson.id}`, { scroll: false })
    }

    return (
        <div className="w-80 border-r border-border h-screen bg-card">
            <div className="p-4 border-b border-border">
                <Button
                    variant="ghost"
                    className="mb-4 w-full justify-start"
                    onClick={() => router.push('/dashboard')}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Dashboard
                </Button>
                <h2 className="font-semibold text-lg mb-2">{course.title}</h2>
                <div className="space-y-2">
                    <Progress value={progressPercentage} className="h-2" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{completedLessons.length} / {totalLessons} Lessons</span>
                        <span>{Math.round(progressPercentage)}% Complete</span>
                    </div>
                </div>
            </div>
            <ScrollArea className="h-[calc(100vh-180px)]">
                <div className="p-4 space-y-4">
                    {course.modules.map((module) => (
                        <div key={module.id}>
                            <button
                                onClick={() => toggleModule(module.id)}
                                className="flex items-center justify-between w-full p-2 hover:bg-accent/5 rounded-lg"
                            >
                                <span className="font-medium">{module.title}</span>
                                <ChevronDown className={cn(
                                    "h-4 w-4 transition-transform",
                                    expandedModules.includes(module.id) ? "transform rotate-180" : ""
                                )} />
                            </button>
                            {expandedModules.includes(module.id) && (
                                <div className="mt-2 ml-4 space-y-2">
                                    {module.lessons.map((lesson) => (
                                        <button
                                            key={lesson.id}
                                            onClick={() => handleLessonClick(lesson)}
                                            className={cn(
                                                "w-full text-left p-2 rounded-lg flex items-center justify-between",
                                                currentLessonId === lesson.id && "bg-accent/10",
                                                completedLessons.includes(lesson.id)
                                                    ? "text-muted-foreground hover:text-foreground"
                                                    : "hover:bg-accent/5"
                                            )}
                                        >
                                            <span>{lesson.title}</span>
                                            {completedLessons.includes(lesson.id) && (
                                                <CheckCircle className="h-4 w-4 text-green-500" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
} 