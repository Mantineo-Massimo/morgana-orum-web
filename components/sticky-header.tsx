"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { MainNav } from "@/components/main-nav"
import { cn } from "@/lib/utils"

export function StickyHeader({ brand, isLoggedIn = false }: { brand: string, isLoggedIn?: boolean }) {
    const isMorgana = brand === "morgana"
    const [isScrolled, setIsScrolled] = useState(false)
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
        setHasMounted(true)
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Brand Colors
    const brandColorClass = isMorgana ? "bg-[#c12830]" : "bg-[#18182e]"

    if (!hasMounted) return null

    return (
        <header
            id="site-header"
            className={cn(
                "sticky top-0 z-50 transition-all duration-500 ease-in-out shadow-md",
                "bg-white" // Base is always white now
            )}
        >
            {/* BACKGROUND LAYER - Handles Colors & Shapes */}
            <div className="absolute inset-0 h-full w-full pointer-events-none z-0 overflow-hidden">
                {/* Colored Part OVERLAY */}
                <div
                    className={cn(
                        "absolute top-0 left-0 h-full transition-all duration-500 z-10",
                        brandColorClass,
                        isMorgana ? "rounded-br-[100px]" : "[clip-path:polygon(0_0,100%_0,85%_100%,0%_100%)]",
                        // Dynamic width logic
                        isScrolled
                            ? (isMorgana ? "w-[75%] md:w-[32%]" : "w-[80%] md:w-[32%]")
                            : (isMorgana ? "w-[85%] md:w-[40%]" : "w-[90%] md:w-[40%]")
                    )}
                />
            </div>

            {/* CONTENT LAYER - Handles Alignment with Container */}
            <div
                className={cn(
                    "container relative z-20 flex items-center transition-all duration-500",
                    isScrolled ? "h-20 md:h-24" : "h-32 md:h-40",
                    "justify-start lg:justify-between gap-2 lg:gap-0"
                )}
            >
                {/* Navigation Section - Menu hamburger a sinistra su mobile */}
                <div className="flex items-center order-1 lg:order-2">
                    <MainNav
                        brand={brand}
                        isScrolled={true} // Always white background style
                        isLoggedIn={isLoggedIn}
                    />
                </div>

                {/* Logo Section - Logo a destra del menu su mobile, a sinistra su desktop */}
                <Link href={`/`} className="flex items-center gap-3 group order-2 lg:order-1">
                    {/* Logo Image */}
                    <div
                        className={cn(
                            "relative transition-all duration-500",
                            isScrolled ? "h-14 w-14" : "h-24 w-24 md:h-32 md:w-32"
                        )}
                    >
                        <Image
                            src={`/assets/${brand}.png`}
                            alt={`${brand} logo`}
                            fill
                            className="object-contain"
                            priority
                            sizes="(max-width: 768px) 96px, 128px"
                        />
                    </div>


                    {/* Text Brand */}
                    <div className="flex flex-col text-white">
                        <span className={cn(
                            "font-serif font-black uppercase tracking-tighter leading-none transition-all duration-500",
                            isScrolled ? "text-xl md:text-2xl" : "text-2xl md:text-4xl"
                        )}>
                            {brand}
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold mt-1 opacity-80 leading-tight">
                            Associazione<br />Universitaria
                        </span>
                    </div>
                </Link>
            </div>
        </header>

    )
}
