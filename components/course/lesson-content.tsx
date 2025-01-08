"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import { Markdown } from '@/components/markdown'
import type { Lesson } from '@/types/course'

interface LessonContentProps {
    lesson: Lesson
    nextLesson: Lesson | null
    previousLesson: Lesson | null
    onLessonChange: (lesson: Lesson) => void
    completedLessons: string[]
    onToggleComplete: (lessonId: string) => Promise<void>
}

export function LessonContent({
    lesson,
    nextLesson,
    previousLesson,
    onLessonChange,
    completedLessons,
    onToggleComplete
}: LessonContentProps) {
    console.log('LessonContent received lesson:', lesson)
    console.log('Lesson content:', lesson.content)

    const [isCompleting, setIsCompleting] = useState(false)

    const handleToggleComplete = async () => {
        setIsCompleting(true)
        await onToggleComplete(lesson.id)
        setIsCompleting(false)
    }

    // Find video content if it exists
    const videoBlock = lesson.content.find(block => block.type === 'video')
    // Filter out video from main content
    const mainContent = lesson.content.filter(block => block.type === 'text')

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Video Section */}
            {videoBlock && (
                <div className="aspect-video w-full rounded-lg overflow-hidden border border-border">
                    <div className="w-full h-full bg-accent/10 flex items-center justify-center text-accent">
                        {/* Placeholder for video - replace with actual video player */}
                        <p>Video: {videoBlock.metadata?.videoUrl}</p>
                    </div>
                </div>
            )}

            {/* Lesson Title */}
            <div>
                <h1 className="text-3xl font-bold">{lesson.title}</h1>
                <p className="text-muted-foreground mt-2">{lesson.description}</p>
            </div>

            {/* Main Content */}
            <div className="prose dark:prose-invert max-w-none">
                {mainContent.map((block, index) => (
                    <Markdown key={index} content={block.content} />
                ))}
            </div>

            {/* Navigation */}
            <div className="border-t border-border pt-8 mt-8">
                <div className="flex items-center justify-between">
                    <div className="flex gap-4">
                        <Button
                            variant="outline"
                            onClick={() => previousLesson && onLessonChange(previousLesson)}
                            disabled={!previousLesson}
                        >
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => nextLesson && onLessonChange(nextLesson)}
                            disabled={!nextLesson}
                        >
                            Next
                            <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                    <Button
                        variant={completedLessons.includes(lesson.id) ? "outline" : "default"}
                        onClick={handleToggleComplete}
                        disabled={isCompleting}
                    >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        {completedLessons.includes(lesson.id) ? 'Completed' : 'Mark as Complete'}
                    </Button>
                </div>
            </div>
        </div>
    )
} 