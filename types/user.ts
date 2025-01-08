export interface UserProfile {
    id: string
    uid: string
    email: string
    username?: string
    displayName?: string
    membershipStatus: 'free' | 'premium'
    progress?: {
        [courseId: string]: {
            completedLessons: string[]
            lastLesson: string
        }
    }
    createdAt: Date
    updatedAt: Date
} 