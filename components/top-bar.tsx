"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, User, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

export function TopBar({ brand }: { brand: string }) {
    const isMorgana = brand === "morgana"
    // Morgana = Red, Orum = Dark Blue (Navy)
    const bgColor = isMorgana ? "bg-[#c12830]" : "bg-[#18182e]"

    return (
        <div id="site-topbar" className={cn("w-full text-white py-2 px-4 shadow-sm", bgColor)}>
            <div className="container mx-auto flex justify-between items-center text-xs md:text-sm font-medium">

                {/* Left Side: "Gazette" or similar CTA */}
                <div className="flex items-center gap-2">
                    <Mail className="size-4" />
                    <span className="uppercase tracking-widest opacity-90 hover:opacity-100 cursor-pointer">
                        Iscriviti alla Newsletter
                    </span>
                </div>

                {/* Right Side: Socials */}
                <div className="flex items-center gap-4 md:gap-6 ml-auto">
                    <div className="flex items-center gap-3">
                        <Link href="#" className="hover:text-white/80 transition-colors"><Facebook className="size-4" /></Link>
                        <Link href="#" className="hover:text-white/80 transition-colors"><Twitter className="size-4" /></Link>
                        <Link href="#" className="hover:text-white/80 transition-colors"><Instagram className="size-4" /></Link>
                        <Link href="#" className="hover:text-white/80 transition-colors"><Youtube className="size-4" /></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
