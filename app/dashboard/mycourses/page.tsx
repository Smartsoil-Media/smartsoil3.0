"use client"

import { useEffect, useState } from 'react'
import { DashboardCourseCard } from '@/components/dashboard-course-card'
import { useAuth } from '@/contexts/auth-context'
import { getCourses } from '@/lib/courses'
import type { Course } from '@/types/course'

export default function MyCoursesPage() {
    const { userProfile } = useAuth()
    const [courses, setCourses] = useState<Course[]>([])
    const [loadingCourses, setLoadingCourses] = useState(true)

    useEffect(() => {
        const loadCourses = async () => {
            try {
                const coursesData = await getCourses()
                setCourses(coursesData)
            } catch (error) {
                console.error('Error loading courses:', error)
            } finally {
                setLoadingCourses(false)
            }
        }

        loadCourses()
    }, [])

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8">My Courses</h1>
            {loadingCourses ? (
                <div>Loading courses...</div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {courses.map((course) => (
                        <DashboardCourseCard
                            key={course.id}
                            id={course.id}
                            title={course.title}
                            description={course.description}
                            instructor={course.instructor}
                            modules={course.modules}
                            progress={userProfile?.progress?.[course.id]}
                        />
                    ))}
                </div>
            )}
        </div>
    )
} 