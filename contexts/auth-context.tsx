"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import {
    User,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import { auth } from '@/lib/firebase/config'
import { createUserProfile, getUserProfile } from '@/lib/firebase/db'
import type { UserProfile } from '@/types/user'

interface AuthContextType {
    user: User | null
    userProfile: UserProfile | null
    loading: boolean
    signUp: (email: string, password: string) => Promise<UserProfile | null>
    signIn: (email: string, password: string) => Promise<UserProfile | null>
    logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    userProfile: null,
    loading: false,
    signUp: async () => null,
    signIn: async () => null,
    logout: async () => { }
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // Get the ID token
                const token = await user.getIdToken()
                // Set the cookie
                document.cookie = `auth-session=${token}; path=/`
                // Get user profile
                const profile = await getUserProfile(user.uid)
                setUserProfile(profile)
            } else {
                // Remove the cookie and profile
                document.cookie = 'auth-session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
                setUserProfile(null)
            }
            setUser(user)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    const signUp = async (email: string, password: string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const profile = await createUserProfile(userCredential.user.uid, email)
            setUserProfile({ ...profile, id: userCredential.user.uid })
            setUser(userCredential.user)
            return { ...profile, id: userCredential.user.uid }
        } catch (error) {
            console.error('Error signing up:', error)
            throw error
        }
    }

    const signIn = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const token = await userCredential.user.getIdToken()
            document.cookie = `session=${token}; path=/`

            // Wait for profile to be fetched
            const profile = await getUserProfile(userCredential.user.uid)
            setUserProfile(profile)
            setUser(userCredential.user)

            return profile // Return the profile so we can check it in the login page
        } catch (error) {
            console.error('Error signing in:', error)
            throw error
        }
    }

    const logout = async () => {
        try {
            await signOut(auth)
            // Clear the auth cookie
            document.cookie = 'auth-session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
            // Clear the user profile
            setUserProfile(null)
            setUser(null)
        } catch (error) {
            console.error('Error signing out:', error)
            throw error
        }
    }

    return (
        <AuthContext.Provider value={{ user, userProfile, loading, signUp, signIn, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext) 