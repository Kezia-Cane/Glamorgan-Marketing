import { createBrowserClient } from '@supabase/ssr'

// Define this as any to avoid complex type issues for MVP
// Recommend generating full types with Supabase CLI for production
export function createClient() {
    return createBrowserClient<any>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
}
