import { useState, useEffect } from 'react'
import { doc, updateDoc, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import type { UserProfile } from '@/types/user'

export function useLessonProgress(courseId: string, userProfile: UserProfile | null) {
    const [completedLessons, setCompletedLessons] = useState<string[]>([])

    useEffect(() => {
        if (!userProfile?.uid) return

        // Set up real-time listener for user's progress
        const userRef = doc(db, 'users', userProfile.uid)
        const unsubscribe = onSnapshot(userRef, (doc) => {
            const userData = doc.data() as UserProfile
            const currentCompletedLessons = userData?.progress?.[courseId]?.completedLessons || []
            setCompletedLessons(currentCompletedLessons)
        })

        return () => unsubscribe()
    }, [courseId, userProfile?.uid])

    const toggleLessonComplete = async (lessonId: string) => {
        if (!userProfile?.uid) return

        const userRef = doc(db, 'users', userProfile.uid)
        const progressPath = `progress.${courseId}`
        const isCurrentlyCompleted = completedLessons.includes(lessonId)
        const newCompletedLessons = isCurrentlyCompleted
            ? completedLessons.filter(id => id !== lessonId)
            : [...completedLessons, lessonId]

        await updateDoc(userRef, {
            [`${progressPath}.completedLessons`]: newCompletedLessons,
            [`${progressPath}.lastLesson`]: lessonId
        })
    }

    return { completedLessons, toggleLessonComplete }
} 