"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

import { logoutAction } from "@/app/actions/auth"
import { LogOut, User } from "lucide-react"

export function MainNav({
    className,
    brand,
    isScrolled = true,
    isLoggedIn = false,
    ...props
}: React.HTMLAttributes<HTMLElement> & { brand: string, isScrolled?: boolean, isLoggedIn?: boolean }) {
    const pathname = usePathname()

    // Rimuoviamo il prefisso /${brand} dai link per farli funzionare con i domini personalizzati
    const routes = [
        {
            href: "/",
            label: "Home",
            active: pathname === "/" || pathname === `/${brand}`,
        },
        {
            href: "/about",
            label: "Chi Siamo",
            active: pathname === "/about" || pathname === `/${brand}/about`,
        },
        {
            href: "/news",
            label: "Notizie",
            active: pathname === "/news" || pathname === `/${brand}/news`,
        },
        {
            href: "/events",
            label: "Eventi",
            active: pathname === "/events" || pathname === `/${brand}/events`,
        },
        {
            href: "/representatives",
            label: "Rappresentanti",
            active: pathname === "/representatives" || pathname === `/${brand}/representatives`,
        },
    ]

    const textColor = isScrolled ? "text-muted-foreground hover:text-primary" : "text-white/80 hover:text-white"
    const activeColor = isScrolled ? "text-primary after:bg-primary" : "text-white after:bg-white"
    const hoverLineColor = isScrolled ? "after:bg-primary" : "after:bg-white"

    return (
        <nav
            className={cn("flex items-center space-x-8 lg:space-x-10", className)}
            {...props}
        >
            {routes.map((route) => (
                <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                        "text-sm font-bold uppercase tracking-widest transition-colors relative",
                        route.active
                            ? `${activeColor} after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px]`
                            : `${textColor} hover:after:w-full after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] ${hoverLineColor} after:transition-all after:duration-300`
                    )}
                >
                    {route.label}
                </Link>
            ))}

            {isLoggedIn ? (
                <div className="flex items-center gap-3 ml-4">
                    <Link
                        href="/dashboard"
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-full text-white font-bold uppercase tracking-widest text-xs transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg",
                            brand === 'morgana'
                                ? "bg-[#c12830]"
                                : "bg-[#18182e]"
                        )}
                    >
                        <User className="size-4" /> Area Personale
                    </Link>

                    <button
                        onClick={() => logoutAction(brand)}
                        className="p-2 rounded-full text-zinc-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Logout"
                    >
                        <LogOut className="size-5" />
                    </button>
                </div>
            ) : (
                <Link
                    href="/login"
                    className={cn(
                        "ml-4 px-6 py-2 rounded-full text-white font-bold uppercase tracking-widest text-xs transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg",
                        brand === 'morgana'
                            ? (isScrolled ? "bg-[#c12830] hover:shadow-[#c12830]/40" : "bg-white text-[#c12830] hover:bg-white/90")
                            : (isScrolled ? "bg-[#18182e] hover:shadow-[#18182e]/40" : "bg-white text-[#18182e] hover:bg-white/90")
                    )}
                >
                    Accedi
                </Link>
            )}
        </nav>
    )
}