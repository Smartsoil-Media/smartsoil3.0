"use client"

import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userProfile } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!userProfile) {
      router.push('/login')
    }
  }, [userProfile, router])

  if (!userProfile) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  )
}

