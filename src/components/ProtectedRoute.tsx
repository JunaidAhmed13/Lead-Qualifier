import { useAuth } from '@clerk/react'
import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'

function FieldSkeleton() {
  return (
    <div className="space-y-2">
      <div className="h-3 w-20 rounded shimmer" />
      <div className="h-11 w-full rounded-lg shimmer" />
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-24">
      <div
        className="w-full max-w-xl rounded-2xl p-8 space-y-6"
        style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
      >
        <div className="space-y-3">
          <div className="h-3 w-32 rounded shimmer" />
          <div className="h-8 w-64 rounded shimmer" />
          <div className="h-4 w-80 rounded shimmer" />
        </div>
        {[...Array(4)].map((_, i) => (
          <FieldSkeleton key={i} />
        ))}
        <div className="h-12 w-full rounded-xl shimmer" />
      </div>
    </div>
  )
}

interface Props {
  children: ReactNode
}

export default function ProtectedRoute({ children }: Props) {
  const { isLoaded, isSignedIn } = useAuth()

  if (!isLoaded) return <LoadingSkeleton />
  if (!isSignedIn) return <Navigate to="/" replace />

  return <>{children}</>
}
