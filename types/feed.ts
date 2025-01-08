import { Timestamp } from 'firebase/firestore'

export interface Reply {
    id: string
    userId: string
    userName: string
    userAvatar?: string
    content: string
    likes: string[]  // Array of userIds who liked
    createdAt: Timestamp
}

export interface Comment {
    id: string
    userId: string
    userName: string
    userAvatar?: string
    content: string
    likes: string[]
    replies: Reply[]
    createdAt: Timestamp
}

export interface Post {
    id: string
    userId: string
    userName: string
    userAvatar?: string
    content: string
    imageUrl?: string
    likes: string[]
    comments: Comment[]
    createdAt: Timestamp
} 