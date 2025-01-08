// This is the server component wrapper
import { getCourses } from '@/lib/courses'
import { CoursesContent } from './courses-content'

export default async function CoursesPage() {
  const courses = await getCourses()
  return <CoursesContent courses={courses} />
}

