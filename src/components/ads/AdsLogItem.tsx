'use client'

import { useState, useTransition } from "react"
import { Pencil, Trash2, X, Check, AlertCircle } from "lucide-react"
import { deleteAdsReport, updateAdsReport } from "@/app/actions/ads"

interface AdsLogItemProps {
    item: any
    isAdmin?: boolean
}

export function AdsLogItem({ item, isAdmin }: AdsLogItemProps) {
    const [editing, setEditing] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | null>(null)

    // Edit form state
    const [spend, setSpend] = useState(String(Number(item.ad_spend).toFixed(2)))
    const [conversions, setConversions] = useState(String(item.conversions))
    const [clicks, setClicks] = useState(String(item.clicks || ''))
    const [notes, setNotes] = useState(item.notes || '')

    const date = new Date(item.date)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(today.getDate() - 1)

    const label =
        date.toDateString() === today.toDateString() ? 'TODAY' :
            date.toDateString() === yesterday.toDateString() ? 'YESTERDAY' : 'PAST'

    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

    function handleDelete() {
        startTransition(async () => {
            const res = await deleteAdsReport(item.id)
            if (res?.error) setError(res.error)
        })
    }

    function handleUpdate() {
        const fd = new FormData()
        fd.set('spend', spend)
        fd.set('conversions', conversions)
        fd.set('clicks', clicks)
        fd.set('notes', notes)

        startTransition(async () => {
            const res = await updateAdsReport(item.id, fd)
            if (res?.error) {
                setError(res.error)
            } else {
                setEditing(false)
                setError(null)
            }
        })
    }

    const cpl = parseFloat(conversions) > 0 ? parseFloat(spend) / parseFloat(conversions) : 0

    if (editing) {
        return (
            <div className="bg-white/80 backdrop-blur-xl rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-6 shadow-md border border-white/60 flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                        <span className="text-[11px] font-bold tracking-widest text-[#1E3A8A] uppercase">{label}</span>
                        <div className="font-bold text-gray-900">{dateStr}</div>
                    </div>
                    <span className="text-[11px] font-bold tracking-widest text-[#1E3A8A] bg-[#EBF0FF] px-3 py-1 rounded-full uppercase">Editing</span>
                </div>

                {error && (
                    <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 rounded-xl p-3">
                        <AlertCircle className="w-4 h-4 shrink-0" />{error}
                    </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Spend ($)</label>
                        <input type="number" value={spend} onChange={e => setSpend(e.target.value)} step="0.01"
                            className="h-11 rounded-xl bg-[#F5F8FF] border-none px-4 font-semibold text-sm outline-none focus:ring-2 focus:ring-[#1E3A8A]" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Conversions</label>
                        <input type="number" value={conversions} onChange={e => setConversions(e.target.value)}
                            className="h-11 rounded-xl bg-[#F5F8FF] border-none px-4 font-semibold text-sm outline-none focus:ring-2 focus:ring-[#1E3A8A]" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Clicks</label>
                        <input type="number" value={clicks} onChange={e => setClicks(e.target.value)}
                            className="h-11 rounded-xl bg-[#F5F8FF] border-none px-4 font-semibold text-sm outline-none focus:ring-2 focus:ring-[#1E3A8A]" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">CPL (auto)</label>
                        <div className="h-11 rounded-xl bg-gray-100 px-4 flex items-center font-bold text-sm text-gray-500">
                            ${cpl.toFixed(2)}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Notes</label>
                    <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2}
                        className="rounded-xl bg-[#F5F8FF] border-none px-4 py-3 font-medium text-sm outline-none focus:ring-2 focus:ring-[#1E3A8A] resize-none" />
                </div>

                <div className="flex gap-3 mt-1">
                    <button
                        onClick={handleUpdate}
                        disabled={isPending}
                        className="flex-1 h-12 rounded-2xl bg-[#1E3A8A] hover:bg-[#0B215E] text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50 cursor-pointer"
                    >
                        <Check className="w-4 h-4" />
                        {isPending ? 'Saving…' : 'Save Changes'}
                    </button>
                    <button
                        onClick={() => { setEditing(false); setError(null) }}
                        className="h-12 px-5 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm flex items-center gap-2 transition-colors cursor-pointer"
                    >
                        <X className="w-4 h-4" />
                        Cancel
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white/80 backdrop-blur-xl rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 flex flex-col gap-4 relative group transition-all duration-300 hover:shadow-lg">
            {/* Date Header + Action Buttons */}
            <div className="flex items-start justify-between">
                <div className="flex flex-col gap-0.5">
                    <span className="text-[11px] font-bold tracking-widest text-[#1E3A8A] uppercase">{label}</span>
                    <span className="text-lg font-bold text-gray-900">{dateStr}</span>
                </div>
                {!isAdmin && (
                    <div className="flex gap-2">
                        <button
                            onClick={() => setEditing(true)}
                            aria-label="Edit entry"
                            className="w-9 h-9 rounded-xl bg-[#EBF0FF] text-[#1E3A8A] hover:bg-[#1E3A8A] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                        >
                            <Pencil className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setConfirmDelete(true)}
                            aria-label="Delete entry"
                            className="w-9 h-9 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>

            {/* Metrics Row */}
            <div className="flex items-center justify-between mt-1">
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Spend</span>
                    <span className="text-[15px] font-bold text-gray-900">${Number(item.ad_spend).toFixed(2)}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Conversions</span>
                    <span className="text-[15px] font-bold text-gray-900">{item.conversions}</span>
                </div>
                <div className="flex flex-col gap-1 items-end">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">CPL</span>
                    <span className="text-[15px] font-bold text-[#1E3A8A]">${Number(item.cost_per_conversion).toFixed(2)}</span>
                </div>
            </div>

            {item.notes && (
                <p className="text-xs text-gray-400 italic border-t border-gray-50 pt-3">{item.notes}</p>
            )}

            {/* Delete Confirm Overlay */}
            {confirmDelete && (
                <div className="absolute inset-0 rounded-[2rem] bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center gap-4 p-6 z-10">
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                        <Trash2 className="w-6 h-6 text-red-500" />
                    </div>
                    <div className="text-center">
                        <div className="font-bold text-gray-900 text-base">Delete this entry?</div>
                        <div className="text-sm text-gray-500 mt-1">{dateStr} — This cannot be undone.</div>
                    </div>
                    <div className="flex gap-3 w-full">
                        <button
                            onClick={handleDelete}
                            disabled={isPending}
                            className="flex-1 h-12 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-bold text-sm transition-colors disabled:opacity-50 cursor-pointer"
                        >
                            {isPending ? 'Deleting…' : 'Yes, Delete'}
                        </button>
                        <button
                            onClick={() => setConfirmDelete(false)}
                            className="flex-1 h-12 rounded-2xl bg-gray-100 text-gray-700 font-bold text-sm transition-colors cursor-pointer hover:bg-gray-200"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
