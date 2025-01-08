"use client"

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useAuth } from '@/contexts/auth-context'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen } from 'lucide-react'
import type { Course } from '@/types/course'

interface CourseCardProps extends Course {
  children?: React.ReactNode
}

export function CourseCard({ id, title, description, thumbnail }: CourseCardProps) {
  const router = useRouter()
  const { userProfile } = useAuth()

  const handleCourseClick = () => {
    if (!userProfile) {
      router.push('/signup')
      return
    }
    router.push('/dashboard/mycourses')
  }

  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative bg-accent/10">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="h-12 w-12 text-accent/50" />
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{description}</p>
        <button
          onClick={handleCourseClick}
          className="block w-full p-2 text-center bg-accent text-accent-foreground rounded-md hover:bg-accent/90"
        >
          Start Learning
        </button>
      </CardContent>
    </Card>
  )
}

