import type { LessonContentBlock } from './course-content'

export interface Module {
    id: string
    title: string
    description: string
    order: number
    lessons: Lesson[]
}

export interface Lesson {
    id: string
    title: string
    description: string
    content: LessonContentBlock[]
    order: number
    moduleId: string
    courseId: string
    resources?: Resource[]
}

export interface Resource {
    id: string
    title: string
    url: string
    type: 'pdf' | 'video' | 'link'
}

export interface Course {
    id: string
    title: string
    description: string
    instructor: string
    thumbnail: string
    order: number
    modules: Module[]
    createdAt: any
    updatedAt: any
}

export interface ContentBlock {
    type: 'text' | 'video'
    format: 'markdown' | 'html'
    content: string
    metadata?: {
        videoUrl?: string
        duration?: number
    }
} 