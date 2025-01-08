import { db } from '@/lib/firebase/config'
import { collection, getDocs, getDoc, doc, query, orderBy } from 'firebase/firestore'
import type { Course, Module, Lesson } from '@/types/course'
import { coursesData } from '@/data/courses'

// Local data utilities (for development/testing)
export function getCourseData(courseId: string): Course | null {
    return coursesData.find(course => course.id === courseId) || null
}

export function getModuleData(courseId: string, moduleId: string): Module | null {
    const course = getCourseData(courseId)
    return course?.modules.find(module => module.id === moduleId) || null
}

export function getLessonData(lessonId: string): Lesson | null {
    for (const course of coursesData) {
        for (const module of course.modules) {
            const lesson = module.lessons.find(l => l.id === lessonId)
            if (lesson) {
                return {
                    ...lesson,
                    courseId: course.id,
                    moduleId: module.id
                }
            }
        }
    }
    return null
}

// Firebase data utilities (for production)
export async function getCourses(): Promise<Course[]> {
    const coursesRef = collection(db, 'courses')
    const q = query(coursesRef, orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(q)

    return snapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().title || '',
        description: doc.data().description || '',
        instructor: doc.data().instructor || '',
        thumbnail: doc.data().thumbnail || '',
        order: doc.data().order || 0,
        modules: doc.data().modules || [],
        createdAt: doc.data().createdAt,
        updatedAt: doc.data().updatedAt
    })) as Course[]
}

export async function getCourse(courseId: string): Promise<Course | null> {
    const courseRef = doc(db, 'courses', courseId)
    const courseSnap = await getDoc(courseRef)

    if (!courseSnap.exists()) return null

    const courseData = courseSnap.data()
    return {
        id: courseSnap.id,
        title: courseData.title || '',
        description: courseData.description || '',
        instructor: courseData.instructor || '',
        thumbnail: courseData.thumbnail || '',
        order: courseData.order || 0,
        modules: courseData.modules || [],
        createdAt: courseData.createdAt?.toDate() || new Date(),
        updatedAt: courseData.updatedAt?.toDate() || new Date()
    } as Course
}

export async function getLesson(courseId: string, lessonId: string): Promise<Lesson | null> {
    const course = await getCourse(courseId)
    if (!course) return null

    for (const module of course.modules) {
        const lesson = module.lessons.find(l => l.id === lessonId)
        if (lesson) {
            return {
                ...lesson,
                courseId: course.id,
                moduleId: module.id
            }
        }
    }
    return null
}

export function getNextLesson(courseId: string, currentModuleId: string, currentLessonId: string) {
    const course = getCourseData(courseId)
    if (!course) return null

    const currentModule = course.modules.find(m => m.id === currentModuleId)
    if (!currentModule) return null

    const currentLessonIndex = currentModule.lessons.findIndex(l => l.id === currentLessonId)

    // Check if there's a next lesson in the current module
    if (currentLessonIndex < currentModule.lessons.length - 1) {
        return {
            moduleId: currentModuleId,
            lessonId: currentModule.lessons[currentLessonIndex + 1].id
        }
    }

    // Check if there's a next module
    const currentModuleIndex = course.modules.findIndex(m => m.id === currentModuleId)
    if (currentModuleIndex < course.modules.length - 1) {
        const nextModule = course.modules[currentModuleIndex + 1]
        return {
            moduleId: nextModule.id,
            lessonId: nextModule.lessons[0].id
        }
    }

    return null
} 