'use client'

import { useEffect, useState, useTransition } from "react"
import { X, CheckCircle2, BarChart3, AlertTriangle, Rocket, Calendar, Pencil, Trash2, Check, AlertCircle } from "lucide-react"
import { USER_NAMES } from "@/lib/utils"
import { updateWeeklyReport, deleteWeeklyReport } from "@/app/actions/reports"

interface ReportModalProps {
    report: any
    onClose: () => void
    currentUserId?: string
}

export function ReportModal({ report, onClose, currentUserId }: ReportModalProps) {
    const email = report.users?.email || ''
    const name = USER_NAMES[email] || report.users?.name || 'Unknown VA'
    const initials = name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)

    const canEdit = currentUserId && (report.user_id === currentUserId || !report.user_id)

    const [editing, setEditing] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | null>(null)

    // Form state
    const [tasks, setTasks] = useState(report.tasks_completed || '')
    const [results, setResults] = useState(report.results || '')
    const [issues, setIssues] = useState(report.issues || '')
    const [plan, setPlan] = useState(report.next_plan || '')

    // Close on Escape key if not editing/confirming delete
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && !editing && !confirmDelete) onClose()
        }
        document.addEventListener('keydown', handler)
        document.body.style.overflow = 'hidden'
        return () => {
            document.removeEventListener('keydown', handler)
            document.body.style.overflow = ''
        }
    }, [onClose, editing, confirmDelete])

    function handleDelete() {
        startTransition(async () => {
            const res = await deleteWeeklyReport(report.id)
            if (res?.error) setError(res.error)
            else onClose()
        })
    }

    function handleUpdate() {
        const fd = new FormData()
        fd.set('tasks', tasks)
        fd.set('results', results)
        fd.set('issues', issues)
        fd.set('plan', plan)

        startTransition(async () => {
            const res = await updateWeeklyReport(report.id, fd)
            if (res?.error) {
                setError(res.error)
            } else {
                setEditing(false)
                setError(null)
                // Mutating local report prop just to show immediate updates visually
                report.tasks_completed = tasks
                report.results = results
                report.issues = issues
                report.next_plan = plan
            }
        })
    }

    return (
        <div
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 sm:p-0"
            aria-modal="true" role="dialog"
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
                onClick={() => !editing && !confirmDelete && onClose()}
            />

            {/* Modal Panel */}
            <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl animate-in slide-in-from-bottom-4 duration-300 max-h-[90vh] overflow-y-auto overflow-x-hidden pt-4 pb-2 sm:py-0">

                {/* Header */}
                <div className="flex items-center justify-between p-7 pb-5 border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur-xl z-20">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-[#F5F8FF] text-[#1E3A8A] flex items-center justify-center font-black text-xl shrink-0 border border-white">
                            {initials}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="text-xl font-bold text-gray-900 leading-tight">{name}</h2>
                                {editing && <span className="text-[10px] font-bold tracking-widest text-[#1E3A8A] bg-[#EBF0FF] px-2 py-0.5 rounded-full uppercase">Editing</span>}
                            </div>
                            <div className="flex items-center gap-1.5 text-sm text-gray-500 font-medium mt-0.5">
                                <Calendar className="w-3.5 h-3.5" />
                                {report.week_start} → {report.week_end}
                            </div>
                        </div>
                    </div>
                    {!editing && (
                        <button
                            onClick={onClose}
                            className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer shrink-0"
                            aria-label="Close"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </div>

                {error && (
                    <div className="mx-7 mt-5 p-3 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />{error}
                    </div>
                )}

                {/* Content Sections */}
                <div className="flex flex-col gap-6 p-7">

                    {/* Tasks Completed */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-xl bg-[#EBF0FF] flex items-center justify-center shrink-0">
                                <CheckCircle2 className="w-4 h-4 text-[#1E3A8A]" />
                            </div>
                            <span className="text-sm font-bold text-gray-900 uppercase tracking-widest">Tasks Completed</span>
                        </div>
                        {editing ? (
                            <textarea value={tasks} onChange={e => setTasks(e.target.value)} rows={3}
                                className="w-full bg-[#F5F8FF] rounded-2xl p-5 text-sm text-gray-700 font-medium border-none focus:ring-2 focus:ring-[#1E3A8A] outline-none resize-none" />
                        ) : (
                            <div className="bg-[#F5F8FF] rounded-2xl p-5 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap break-words font-medium">
                                {report.tasks_completed || '—'}
                            </div>
                        )}
                    </div>

                    {/* Results & KPIs */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-xl bg-[#FFFBEB] flex items-center justify-center shrink-0">
                                <BarChart3 className="w-4 h-4 text-[#F59E0B]" />
                            </div>
                            <span className="text-sm font-bold text-gray-900 uppercase tracking-widest">Results & KPIs</span>
                        </div>
                        {editing ? (
                            <textarea value={results} onChange={e => setResults(e.target.value)} rows={3}
                                className="w-full bg-[#FFFBEB]/60 border border-[#FEF3C7] rounded-2xl p-5 text-sm text-gray-700 font-medium focus:ring-2 focus:ring-[#F59E0B] outline-none resize-none" />
                        ) : (
                            <div className="bg-[#FFFBEB]/60 border border-[#FEF3C7] rounded-2xl p-5 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap break-words font-medium">
                                {report.results || '—'}
                            </div>
                        )}
                    </div>

                    {/* Issues & Blockers */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                                <AlertTriangle className="w-4 h-4 text-red-500" />
                            </div>
                            <span className="text-sm font-bold text-gray-900 uppercase tracking-widest">Issues & Blockers</span>
                        </div>
                        {editing ? (
                            <textarea value={issues} onChange={e => setIssues(e.target.value)} rows={3}
                                className="w-full bg-red-50 border border-red-100 rounded-2xl p-5 text-sm text-gray-700 font-medium focus:ring-2 focus:ring-red-500 outline-none resize-none" />
                        ) : (
                            <div className="bg-red-50 border border-red-100 rounded-2xl p-5 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap break-words font-medium">
                                {report.issues || '—'}
                            </div>
                        )}
                    </div>

                    {/* Next Plan */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-xl bg-[#EBF0FF] flex items-center justify-center shrink-0">
                                <Rocket className="w-4 h-4 text-[#1E3A8A]" />
                            </div>
                            <span className="text-sm font-bold text-gray-900 uppercase tracking-widest">Next Plan</span>
                        </div>
                        {editing ? (
                            <textarea value={plan} onChange={e => setPlan(e.target.value)} rows={3}
                                className="w-full bg-[#F5F8FF] rounded-2xl p-5 text-sm text-gray-700 font-medium border-none focus:ring-2 focus:ring-[#1E3A8A] outline-none resize-none" />
                        ) : (
                            <div className="bg-[#F5F8FF] rounded-2xl p-5 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap break-words font-medium">
                                {report.next_plan || '—'}
                            </div>
                        )}
                    </div>

                </div>

                {/* Footer Controls */}
                <div className="p-7 pt-0 flex flex-col gap-3 sticky bottom-0 bg-white/90 backdrop-blur-xl z-20">
                    {editing ? (
                        <div className="flex gap-3">
                            <button
                                onClick={handleUpdate}
                                disabled={isPending}
                                className="flex-1 h-14 rounded-2xl bg-[#1E3A8A] hover:bg-[#0B215E] text-white font-bold text-sm tracking-wide transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                <Check className="w-5 h-5" />
                                {isPending ? 'Saving...' : 'Save Changes'}
                            </button>
                            <button
                                onClick={() => { setEditing(false); setError(null) }}
                                disabled={isPending}
                                className="h-14 px-6 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm tracking-wide transition-colors cursor-pointer disabled:opacity-50"
                            >
                                Cancel
                            </button>
                        </div>
                    ) : confirmDelete ? (
                        <div className="flex flex-col gap-3 bg-red-50 p-5 rounded-2xl border border-red-100 animate-in fade-in zoom-in-95">
                            <div className="font-bold text-red-900 text-center">Delete this report permanently?</div>
                            <div className="flex gap-3 mt-1">
                                <button
                                    onClick={handleDelete}
                                    disabled={isPending}
                                    className="flex-1 h-12 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-sm transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    {isPending ? 'Deleting...' : 'Yes, Delete'}
                                </button>
                                <button
                                    onClick={() => setConfirmDelete(false)}
                                    disabled={isPending}
                                    className="flex-1 h-12 rounded-xl bg-white hover:bg-gray-50 text-gray-700 font-bold text-sm transition-colors cursor-pointer border border-gray-200 disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <button
                                onClick={onClose}
                                className="flex-1 h-14 rounded-2xl bg-[#1E3A8A] hover:bg-[#0B215E] text-white font-bold text-sm tracking-wide transition-colors cursor-pointer shadow-lg shadow-[#1E3A8A]/20"
                            >
                                Close Report
                            </button>
                            {canEdit && (
                                <>
                                    <button
                                        onClick={() => setEditing(true)}
                                        className="w-14 h-14 rounded-2xl bg-[#EBF0FF] hover:bg-[#1E3A8A] text-[#1E3A8A] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                                        aria-label="Edit Report"
                                    >
                                        <Pencil className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => setConfirmDelete(true)}
                                        className="w-14 h-14 rounded-2xl bg-red-50 hover:bg-red-500 text-red-500 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                                        aria-label="Delete Report"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}
