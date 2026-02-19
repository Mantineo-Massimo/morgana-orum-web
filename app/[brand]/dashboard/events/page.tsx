"use client"

import { useState, useEffect } from "react"
import { Calendar, CheckCircle, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { getUserDashboardData } from "@/app/actions/users"

export default function DashboardEventsPage({ params }: { params: { brand: string } }) {
    const { brand } = params
    const [loading, setLoading] = useState(true)
    const [userEvents, setUserEvents] = useState<any[]>([])

    useEffect(() => {
        async function loadData() {
            setLoading(true)
            const data = await getUserDashboardData()
            if (data) {
                setUserEvents(data.events)
            }
            setLoading(false)
        }
        loadData()
    }, [])

    if (loading) return null

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-bold text-zinc-900 mb-2">I Miei Eventi</h1>
                <p className="text-zinc-500">Lo storico delle tue partecipazioni e i prossimi appuntamenti.</p>
            </div>

            <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
                <div className="p-6">
                    {userEvents.length === 0 ? (
                        <div className="text-center py-12 text-zinc-400">
                            <Calendar className="size-12 mx-auto mb-4 opacity-50" />
                            <p>Non hai ancora partecipato a nessun evento.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {userEvents.map(event => (
                                <div key={event.id} className="flex flex-col md:flex-row md:items-center justify-between p-6 rounded-xl border border-zinc-100 hover:bg-zinc-50 transition-colors gap-4">
                                    <div className="flex items-start gap-4">
                                        <div className={cn(
                                            "size-12 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-lg shadow-sm mt-1",
                                            event.status === "CFU Convalidati" ? "bg-green-500" : "bg-zinc-300"
                                        )}>
                                            {event.status === "CFU Convalidati" ? <CheckCircle className="size-6" /> : "..."}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-zinc-900 text-lg mb-1">{event.title}</h4>
                                            <p className="text-zinc-500 text-sm flex items-center gap-2">
                                                <Calendar className="size-3" /> {event.date}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 justify-between md:justify-end w-full md:w-auto mt-2 md:mt-0">
                                        {event.points && (
                                            <div className="text-right mr-4">
                                                <span className="block text-xs font-bold text-zinc-400 uppercase tracking-wider">CFU/Ore</span>
                                                <span className="font-bold text-zinc-900">{event.points}</span>
                                            </div>
                                        )}
                                        <span className={cn(
                                            "px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider",
                                            event.status === "CFU Convalidati" ? "bg-green-100 text-green-700" :
                                                event.status === "Partecipato" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"
                                        )}>
                                            {event.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
