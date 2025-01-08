"use client"

import { Button } from '@/components/ui/button'
import { CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import type { Lesson } from '@/types/course'
import { Markdown } from '@/components/markdown'

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
    const [isCompleting, setIsCompleting] = useState(false)

    const handleToggleComplete = async () => {
        setIsCompleting(true)
        await onToggleComplete(lesson.id)
        setIsCompleting(false)
    }

    // Find video content if it exists
    const videoBlock = lesson.content.find(block => block.type === 'video')
    // Filter out video from main content
    const mainContent = lesson.content.filter(block => block.type !== 'video')

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Video Section */}
            {videoBlock && (
                <div className="aspect-video w-full rounded-lg overflow-hidden border border-border">
                    <iframe
                        src={videoBlock.metadata?.videoUrl}
                        className="w-full h-full"
                        allowFullScreen
                    />
                </div>
            )}

            {/* Lesson Title */}
            <h1 className="text-3xl font-bold">{lesson.title}</h1>

            {/* Main Content */}
            <div className="prose dark:prose-invert max-w-none">
                {mainContent.map((block, index) => {
                    if (block.type === 'text' && block.format === 'markdown') {
                        return <Markdown key={index} content={block.content} />
                    }
                    return null
                })}
            </div>

            {/* Lesson Navigation and Complete Button */}
            <div className="border-t border-border pt-8 mt-8">
                <div className="flex items-center justify-between">
                    <div className="flex gap-4">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => previousLesson && onLessonChange(previousLesson)}
                            disabled={!previousLesson}
                        >
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Previous Lesson
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => nextLesson && onLessonChange(nextLesson)}
                            disabled={!nextLesson}
                        >
                            Next Lesson
                            <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                    <Button
                        variant={completedLessons.includes(lesson.id) ? "outline" : "default"}
                        onClick={handleToggleComplete}
                        disabled={isCompleting}
                        size="lg"
                    >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        {completedLessons.includes(lesson.id) ? 'Completed' : 'Mark as Complete'}
                    </Button>
                </div>
            </div>
        </div>
    )
} 