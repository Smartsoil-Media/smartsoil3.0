"use client"

import { useEffect, useState, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { getCourse } from '@/lib/courses'
import { LessonContent } from '@/components/course/lesson-content'
import { CourseSidebar } from '@/components/course/course-sidebar'
import type { Course, Lesson } from '@/types/course'
import { useLessonProgress } from '@/hooks/useLessonProgress'

export default function CoursePage() {
    const searchParams = useSearchParams()
    const courseId = searchParams.get('id') || ''
    const lessonId = searchParams.get('lessonId')
    const [course, setCourse] = useState<Course | null>(null)
    const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null)
    const { userProfile } = useAuth()
    const { completedLessons, toggleLessonComplete } = useLessonProgress(courseId, userProfile)

    const loadCourse = useCallback(async () => {
        if (!courseId) return
        console.log('Loading course with ID:', courseId)
        const courseData = await getCourse(courseId)
        console.log('Loaded course data:', courseData)
        setCourse(courseData)

        if (courseData) {
            let lessonToShow: Lesson | null = null
            console.log('Looking for lesson with ID:', lessonId)

            if (lessonId) {
                for (const module of courseData.modules) {
                    const lesson = module.lessons.find(l => l.id === lessonId)
                    if (lesson) {
                        lessonToShow = lesson
                        console.log('Found specific lesson:', lesson)
                        break
                    }
                }
            }

            if (!lessonToShow && courseData.modules[0]?.lessons[0]) {
                lessonToShow = courseData.modules[0].lessons[0]
                console.log('Using first lesson as default:', lessonToShow)
            }

            setCurrentLesson(lessonToShow)
        }
    }, [courseId, lessonId])

    useEffect(() => {
        loadCourse()
    }, [loadCourse])

    console.log('Current lesson state:', currentLesson)
    console.log('Course state:', course)

    if (!course) {
        return <div>Loading...</div>
    }

    return (
        <div className="flex min-h-screen">
            <CourseSidebar
                course={course}
                currentLessonId={currentLesson?.id}
                onLessonSelect={setCurrentLesson}
                completedLessons={completedLessons}
            />
            <main className="flex-1 p-8">
                {currentLesson && (
                    <LessonContent
                        lesson={currentLesson}
                        nextLesson={getNextLesson(course, currentLesson)}
                        previousLesson={getPreviousLesson(course, currentLesson)}
                        onLessonChange={setCurrentLesson}
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