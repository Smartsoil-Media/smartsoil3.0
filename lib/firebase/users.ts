import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from './config'
import type { UserProfile } from '@/types/user'

export async function createUserProfile(uid: string, email: string) {
    const userRef = doc(db, 'users', uid)

    const userData: Omit<UserProfile, 'id'> = {
        uid,
        email,
        membershipStatus: 'free',
        progress: {},
        createdAt: new Date(),
        updatedAt: new Date()
    }

    await setDoc(userRef, userData)
    return { ...userData, id: uid }
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
    const userRef = doc(db, 'users', uid)
    const userSnap = await getDoc(userRef)

    if (!userSnap.exists()) {
        return null
    }

    return {
        id: uid,
        ...userSnap.data()
    } as UserProfile
} 