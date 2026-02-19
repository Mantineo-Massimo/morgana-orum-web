"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { QrCode, Calendar, Clock, CheckCircle, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { getUserDashboardData } from "@/app/actions/users"
import Image from "next/image"
import Link from "next/link"

import { ShieldCheck } from "lucide-react"

export const dynamic = "force-dynamic"

export default function DashboardPage({ params }: { params: { brand: string } }) {
    const { brand } = params
    const isMorgana = brand === "morgana"

    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState<any>(null)

    useEffect(() => {
        async function loadData() {
            setLoading(true)
            const data = await getUserDashboardData()
            if (data) {
                setUserData(data.user)
            }
            setLoading(false)
        }
        loadData()
    }, [])

    if (loading) return null // Layout handles loading

    if (!userData) return null

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Welcome Section */}
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-zinc-900 mb-2 leading-tight">Panoramica</h1>
                    <p className="text-zinc-500">Benvenuto nella tua area riservata.</p>
                </div>
                {userData.role === "ADMIN" && (
                    <Link
                        href="/admin"
                        className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors border border-zinc-200 bg-zinc-900 text-white hover:bg-zinc-800 flex items-center gap-2"
                    >
                        <ShieldCheck className="size-4" /> Pannello Admin
                    </Link>
                )}
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-start">

                {/* DIGITAL CARD SECTION */}
                {/* LEFT COLUMN: Card + Offers */}
                <div className="space-y-6">
                    {/* DIGITAL CARD SECTION */}
                    <div className="relative w-full aspect-[1.58/1] rounded-2xl shadow-2xl overflow-hidden transition-transform hover:scale-[1.01] duration-500 group">
                        {/* CSS Gradient Background */}
                        <div className={cn(
                            "absolute inset-0 z-0",
                            isMorgana
                                ? "bg-gradient-to-br from-[#8a1c22] via-[#c12830] to-[#e04f56]"
                                : "bg-gradient-to-br from-[#0f0f1d] via-[#18182e] to-[#2a2a4a]"
                        )}>
                            {/* Abstract Patterns Overlay */}
                            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] opacity-20 bg-[radial-gradient(circle,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:20px_20px] rotate-12 pointer-events-none"></div>
                            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
                        </div>

                        {/* Card Content */}
                        <div className="relative z-10 h-full p-6 md:p-8 flex flex-col justify-between text-white">
                            {/* Top Section: Logos */}
                            <div className="flex justify-end">
                                <div className="bg-white/90 p-2 rounded-xl shadow-lg backdrop-blur-sm flex items-center gap-3">
                                    <div className="relative size-8 md:size-12">
                                        <Image src="/assets/morgana.png" alt="Morgana" fill className="object-contain" sizes="(max-width: 768px) 32px, 48px" />
                                    </div>
                                    <div className="relative size-8 md:size-12">
                                        <Image src="/assets/orum.png" alt="O.R.U.M." fill className="object-contain" sizes="(max-width: 768px) 32px, 48px" />
                                    </div>
                                    <div className="relative size-8 md:size-12">
                                        <Image src="/assets/azione.png" alt="Azione" fill className="object-contain" sizes="(max-width: 768px) 32px, 48px" />
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Section: User Info & Status */}
                            <div className="mt-auto">
                                <div className="flex items-end justify-between">
                                    <div>
                                        <h3 className="text-2xl font-bold tracking-tight shadow-black/10 drop-shadow-lg">{userData.name} {userData.surname}</h3>
                                        <p className="text-sm opacity-90 font-mono mt-1 tracking-wider">#{userData.matricola}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center gap-2 justify-end mb-1">
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                            </span>
                                            <span className="font-medium text-xs uppercase tracking-wider">Membro attivo dal 2026</span>
                                        </div>
                                        <p className="font-serif italic text-[10px] opacity-80">&quot;Sempre dalla parte dello studente&quot;</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Discover Offers Button */}
                    <div className="bg-white rounded-xl p-6 border border-zinc-100 shadow-sm text-center">
                        <h3 className="font-bold text-zinc-900 mb-2">Vantaggi Esclusivi</h3>
                        <p className="text-xs text-zinc-500 mb-4">Scopri le convenzioni riservate ai soci.</p>
                        <button className={cn(
                            "w-full py-3 rounded-xl text-sm font-bold transition-all border-2 flex items-center justify-center gap-2 group",
                            isMorgana
                                ? "border-orange-100 text-orange-600 hover:bg-orange-50"
                                : "border-blue-100 text-blue-900 hover:bg-blue-50"
                        )}>
                            <span className="group-hover:scale-110 transition-transform">🎁</span> Scopri le Offerte
                        </button>
                    </div>
                </div>

                {/* RIGHT COLUMN: NEXT EVENT */}
                <div className="h-full">
                    <div className="bg-white rounded-2xl p-8 border border-zinc-100 shadow-sm relative overflow-hidden h-full flex flex-col justify-center min-h-[400px]">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-zinc-50 rounded-bl-full -mr-10 -mt-10 z-0"></div>

                        <div className="relative z-10">
                            <span className={cn(
                                "inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-6",
                                isMorgana ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-800"
                            )}>
                                Prossimo Evento
                            </span>

                            <h3 className="text-2xl font-bold text-zinc-900 mb-2 leading-tight">Il Diritto d&apos;Autore nell&apos;Era Digitale</h3>
                            <p className="text-zinc-500 mb-8 text-sm leading-relaxed">Un seminario di approfondimento sulle nuove normative europee e l&apos;impatto sull&apos;industria creativa. Ospiti d&apos;eccezione.</p>

                            <div className="flex flex-col gap-3 mb-8">
                                <div className="flex items-center gap-3 text-sm text-zinc-600">
                                    <Calendar className="size-4 text-zinc-400" />
                                    <span className="font-medium">24 Febbraio 2026</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-zinc-600">
                                    <Clock className="size-4 text-zinc-400" />
                                    <span className="font-medium">15:30 - 18:30</span>
                                </div>
                            </div>

                            <button className={cn(
                                "w-full py-3 rounded-xl text-sm font-bold transition-all shadow-lg shadow-zinc-100 hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2",
                                isMorgana
                                    ? "bg-gradient-to-r from-orange-500 to-red-600 text-white hover:brightness-110"
                                    : "bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:brightness-110"
                            )}>
                                Iscriviti all&apos;Evento <CheckCircle className="size-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
