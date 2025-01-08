import { db } from '@/lib/firebase/config'
import { doc, getDoc, collection, getDocs } from 'firebase/firestore'
import type { Course, Module, Lesson } from '@/types/course'

export async function getCourses(): Promise<Course[]> {
    try {
        const coursesSnapshot = await getDocs(collection(db, 'courses'))
        const courses: Course[] = []

        for (const courseDoc of coursesSnapshot.docs) {
            const courseData = courseDoc.data()

            // Get modules for this course
            const modulesSnapshot = await getDocs(collection(db, 'courses', courseDoc.id, 'modules'))
            const modules: Module[] = []

            // For each module, get its lessons
            for (const moduleDoc of modulesSnapshot.docs) {
                const moduleData = moduleDoc.data()

                // Get lessons for this module
                const lessonsSnapshot = await getDocs(
                    collection(db, 'courses', courseDoc.id, 'modules', moduleDoc.id, 'lessons')
                )

                const lessons = lessonsSnapshot.docs.map(lessonDoc => ({
                    id: lessonDoc.id,
                    ...lessonDoc.data()
                })) as Lesson[]

                modules.push({
                    id: moduleDoc.id,
                    title: moduleData.title,
                    description: moduleData.description,
                    order: moduleData.order,
                    lessons: lessons.sort((a, b) => a.order - b.order)
                })
            }

            // Sort modules by order
            modules.sort((a, b) => a.order - b.order)

            courses.push({
                id: courseDoc.id,
                ...courseData,
                modules
            } as Course)
        }

        return courses
    } catch (error) {
        console.error('Error fetching courses:', error)
        return []
    }
}

export async function getCourse(courseId: string): Promise<Course | null> {
    try {
        console.log('Fetching course:', courseId)
        // Get the course document
        const courseDoc = await getDoc(doc(db, 'courses', courseId))

        if (!courseDoc.exists()) {
            console.log('No course found with ID:', courseId)
            return null
        }

        // Get the modules subcollection
        const modulesSnapshot = await getDocs(collection(db, 'courses', courseId, 'modules'))
        const modules: Module[] = []

        // For each module, get its lessons
        for (const moduleDoc of modulesSnapshot.docs) {
            const moduleData = moduleDoc.data()

            // Get lessons for this module
            const lessonsSnapshot = await getDocs(
                collection(db, 'courses', courseId, 'modules', moduleDoc.id, 'lessons')
            )

            const lessons = lessonsSnapshot.docs.map(lessonDoc => ({
                id: lessonDoc.id,
                ...lessonDoc.data()
            })) as Lesson[]

            modules.push({
                id: moduleDoc.id,
                title: moduleData.title,
                description: moduleData.description,
                order: moduleData.order,
                lessons: lessons.sort((a, b) => a.order - b.order)
            })
        }

        // Sort modules by order
        modules.sort((a, b) => a.order - b.order)

        console.log('Fetched modules:', modules)

        return {
            id: courseDoc.id,
            ...courseDoc.data(),
            modules
        } as Course
    } catch (error) {
        console.error('Error fetching course:', error)
        return null
    }
} 