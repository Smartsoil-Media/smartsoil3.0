"use client"

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { getCourse } from '@/lib/courses'
import { LessonContent } from '@/components/course/lesson-content'
import { CourseSidebar } from '@/components/course/course-sidebar'
import type { Course, Lesson } from '@/types/course'
import { useLessonProgress } from '@/hooks/useLessonProgress'

export default function CoursePage() {
    const searchParams = useSearchParams()
    const courseId = searchParams.get('id')
    const [course, setCourse] = useState<Course | null>(null)
    const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null)
    const { userProfile } = useAuth()
    const { completedLessons, toggleLessonComplete } = useLessonProgress(courseId || '', userProfile)

    useEffect(() => {
        if (courseId) {
            const loadCourse = async () => {
                const courseData = await getCourse(courseId)
                setCourse(courseData)
                // Set initial lesson
                if (courseData?.modules[0]?.lessons[0]) {
                    setCurrentLesson(courseData.modules[0].lessons[0])
                }
            }
            loadCourse()
        }
    }, [courseId])

    const handleLessonSelect = (lesson: Lesson) => {
        setCurrentLesson(lesson)
    }

    if (!course) {
        return <div>Loading...</div>
    }

    return (
        <div className="flex min-h-screen">
            <CourseSidebar
                course={course}
                currentLessonId={currentLesson?.id}
                onLessonSelect={handleLessonSelect}
                completedLessons={completedLessons}
            />
            <main className="flex-1 p-8">
                {currentLesson && (
                    <LessonContent
                        lesson={currentLesson}
                        nextLesson={getNextLesson(course, currentLesson)}
                        previousLesson={getPreviousLesson(course, currentLesson)}
                        onLessonChange={handleLessonSelect}
                        completedLessons={completedLessons}
                        onToggleComplete={toggleLessonComplete}
                    />
                )}
            </main>
        </div>
    )
}

function getNextLesson(course: Course, currentLesson: Lesson) {
    for (const module of course.modules) {
        const lessonIndex = module.lessons.findIndex(l => l.id === currentLesson.id)
        if (lessonIndex !== -1 && lessonIndex < module.lessons.length - 1) {
            return module.lessons[lessonIndex + 1]
        }
    }
    return null
}

function getPreviousLesson(course: Course, currentLesson: Lesson) {
    for (const module of course.modules) {
        const lessonIndex = module.lessons.findIndex(l => l.id === currentLesson.id)
        if (lessonIndex !== -1 && lessonIndex > 0) {
            return module.lessons[lessonIndex - 1]
        }
    }
    return null
} 