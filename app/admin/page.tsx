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

                // First create the course document
                await setDoc(courseRef, {
                    id: courseId,
                    title: courseData.title,
                    description: courseData.description,
                    instructor: courseData.instructor,
                    thumbnail: courseData.thumbnail,
                    order: courseData.order,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp()
                })

                // Then create modules subcollection
                for (const module of courseData.modules) {
                    const moduleRef = doc(collection(db, 'courses', courseId, 'modules'))
                    const moduleId = moduleRef.id

                    // Create module document
                    await setDoc(moduleRef, {
                        id: moduleId,
                        title: module.title,
                        description: module.description,
                        order: module.order
                    })

                    // Create lessons subcollection for this module
                    for (const lesson of module.lessons) {
                        const lessonRef = doc(collection(db, 'courses', courseId, 'modules', moduleId, 'lessons'))
                        await setDoc(lessonRef, {
                            id: lessonRef.id,
                            title: lesson.title,
                            description: lesson.description,
                            content: lesson.content,
                            order: lesson.order,
                            moduleId: moduleId,
                            courseId: courseId,
                            resources: lesson.resources || []
                        })
                    }
                }
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