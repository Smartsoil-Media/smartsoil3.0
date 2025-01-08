import { db } from '@/lib/firebase/config'
import {
    doc,
    setDoc,
    getDoc,
    updateDoc
} from 'firebase/firestore'
import type { UserProfile } from '@/types/user'

export async function createUserProfile(uid: string, email: string) {
    const userRef = doc(db, 'users', uid)
    const profile: Omit<UserProfile, 'id'> & { uid: string } = {
        uid,
        email,
        membershipStatus: 'premium',
        createdAt: new Date(),
        updatedAt: new Date()
    }

    await setDoc(userRef, profile)
    return profile
}

export async function getUserProfile(uid: string) {
    const userRef = doc(db, 'users', uid)
    const docSnap = await getDoc(userRef)
    return docSnap.exists() ? { ...docSnap.data(), id: uid } as UserProfile : null
}

export async function updateUserMembership(uid: string, status: 'free' | 'premium') {
    const userRef = doc(db, 'users', uid)
    await updateDoc(userRef, {
        membershipStatus: status,
        updatedAt: new Date()
    })
}

export async function updateUsername(uid: string, username: string) {
    const userRef = doc(db, 'users', uid)
    await updateDoc(userRef, {
        username,
        updatedAt: new Date()
    })
} 