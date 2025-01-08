"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { coursesData } from '@/data/courses'
import { db } from '@/lib/firebase/config'
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from 'next/navigation'

interface VideoMetadata {
    videoUrl?: string;
    duration?: number;
}

export default function AdminPage() {
    const { userProfile } = useAuth()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState('')

    // Redirect if not admin
    if (!userProfile) {
        return <div>Loading...</div>
    }

    if (userProfile.membershipStatus !== 'premium') {
        router.push('/')
        return null
    }

    const importCourses = async () => {
        setLoading(true)
        setStatus('Starting import...')

        try {
            for (const courseData of coursesData) {
                const coursesRef = collection(db, 'courses')
                const courseRef = doc(coursesRef)
                const courseId = courseRef.id

                // Flatten modules and lessons into a single lessons array
                const lessons = courseData.modules.flatMap(module =>
                    module.lessons.map(lesson => ({
                        id: doc(collection(db, 'temp')).id,
                        title: lesson.title,
                        description: lesson.description,
                        content: lesson.content,
                        order: lesson.order,
                        resources: lesson.resources || []
                    }))
                )

                await setDoc(courseRef, {
                    id: courseId,
                    title: courseData.title,
                    description: courseData.description,
                    instructor: courseData.instructor,
                    thumbnail: courseData.thumbnail,
                    lessons: lessons,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp()
                })
            }

            setStatus('Import completed successfully!')
        } catch (error) {
            console.error('Error importing courses:', error)
            setStatus('Error importing courses')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

            <div className="space-y-8">
                <div className="p-6 bg-card rounded-lg border">
                    <h2 className="text-xl font-semibold mb-4">Course Management</h2>
                    <Button
                        onClick={importCourses}
                        disabled={loading}
                        className="mb-4"
                    >
                        {loading ? 'Importing...' : 'Import Course Content'}
                    </Button>

                    {status && (
                        <div className="mt-4 p-4 rounded-lg bg-secondary">
                            <p className="text-sm">{status}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
} 