"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Leaf, Sprout, Users, Activity, BarChart } from 'lucide-react'
import { DashboardCourseCard } from '@/components/dashboard-course-card'
import { useAuth } from '@/contexts/auth-context'
import { getCourses } from '@/lib/courses'
import type { Course } from '@/types/course'

export default function DashboardPage() {
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
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Soil Health Score</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs text-muted-foreground">+2% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Biodiversity Index</CardTitle>
              <Leaf className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6.2</div>
              <p className="text-xs text-muted-foreground">+0.3 from last assessment</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Community Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,350</div>
              <p className="text-xs text-muted-foreground">+180 new this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Learning Progress</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32%</div>
              <p className="text-xs text-muted-foreground">+4% this week</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Farm Activity Feed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Sprout className="mr-2 h-4 w-4 text-green-500" />
                  <span className="text-sm">New cover crop planted in Field 3</span>
                </div>
                <div className="flex items-center">
                  <Leaf className="mr-2 h-4 w-4 text-green-500" />
                  <span className="text-sm">Soil test results updated for Field 1</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="mr-2 h-4 w-4 text-green-500" />
                  <span className="text-sm">Completed lesson on soil biology</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Regenerative Resources</CardTitle>
              <CardDescription>Expand your knowledge</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <Sprout className="mr-2 h-5 w-5 text-green-500" />
                  <span>Soil Health Assessment Guide</span>
                </li>
                <li className="flex items-center">
                  <Leaf className="mr-2 h-5 w-5 text-green-500" />
                  <span>Biodiversity Monitoring Toolkit</span>
                </li>
                <li className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5 text-green-500" />
                  <span>Regenerative Farming Case Studies</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">My Learning Path</h2>
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
                  thumbnail={course.thumbnail}
                  modules={course.modules}
                  progress={userProfile?.progress?.[course.id]}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

