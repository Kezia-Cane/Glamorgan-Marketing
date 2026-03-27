'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AuthHandler() {
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN' && session) {
                // If the URL has #access_token, Supabase's JS will pick it up
                // We need to trigger a refresh for the middleware to see the cookies
                router.refresh()
                // For "invite" flows, often the user lands on "/" but we want dashboard or update-password
                router.push('/dashboard')
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [router, supabase.auth])

    return null
}
