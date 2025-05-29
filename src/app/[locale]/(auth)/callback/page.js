'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { setCookie } from 'cookies-next'
import { Loader2 } from 'lucide-react'

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  useEffect(() => {
    if (error) {
      router.push(`/login?error=${error}`)
      return
    }

    // Lưu token và chuyển hướng
    const saveTokenAndRedirect = async () => {
      try {
        const response = await fetch('/api/auth/session', {
          credentials: 'include'
        })
        
        if (response.ok) {
          router.push('/onboarding') // Hoặc dashboard tùy trạng thái onboarding
        } else {
          router.push('/login?error=auth_failed')
        }
      } catch (err) {
        console.error('Auth callback error:', err)
        router.push('/login?error=server_error')
      }
    }

    saveTokenAndRedirect()
  }, [router, error])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-lg">Đang xử lý đăng nhập...</p>
      </div>
    </div>
  )
}