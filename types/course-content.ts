export type ContentFormat = 'markdown' | 'html'

export interface LessonContentBlock {
    type: 'text' | 'video'
    content: string
    format: ContentFormat
    metadata?: {
        videoUrl?: string
        duration?: number
    }
}

export interface QuizQuestion {
    id: string
    question: string
    type: 'multiple-choice' | 'true-false' | 'short-answer'
    options?: string[]
    correctAnswer: string | string[]
    explanation: string
}

export interface Assignment {
    title: string
    description: string
    dueDate?: string
    points?: number
    submissionType: 'text' | 'file' | 'link'
    rubric?: {
        criteria: string
        points: number
    }[]
} 