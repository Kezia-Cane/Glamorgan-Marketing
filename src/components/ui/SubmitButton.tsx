'use client'

import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"

export function SubmitButton({
    defaultText = "Submit",
    pendingText = "Submitting...",
    className = "",
}: {
    defaultText?: string
    pendingText?: string
    className?: string
}) {
    const { pending } = useFormStatus()

    return (
        <Button
            type="submit"
            disabled={pending}
            size="lg"
            className={`transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        >
            {pending ? pendingText : defaultText}
        </Button>
    )
}
