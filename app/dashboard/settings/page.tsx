"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/auth-context"
import { updateUsername } from '@/lib/firebase/db'

export default function SettingsPage() {
    const { user, userProfile } = useAuth()
    const [username, setUsername] = useState('')
    const [status, setStatus] = useState('')

    const handleUpdateUsername = async () => {
        if (!user) return

        try {
            setStatus('Updating username...')
            await updateUsername(user.uid, username)
            setStatus('Username updated successfully!')
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Error updating username:', error)
                setStatus(`Error: ${error.message}`)
            } else {
                console.error('Unknown error:', error)
                setStatus('An unknown error occurred')
            }
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Settings</h1>

            <div className="max-w-md space-y-4">
                <div>
                    <label className="text-sm font-medium">Username</label>
                    <Input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        className="mt-1"
                    />
                </div>

                <Button onClick={handleUpdateUsername}>
                    Update Username
                </Button>

                {status && (
                    <p className="text-sm text-muted-foreground">{status}</p>
                )}
            </div>
        </div>
    )
} 