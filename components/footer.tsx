"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from "lucide-react"
import { cn } from "@/lib/utils"

export function Footer({ brand }: { brand: string }) {
    const isMorgana = brand === "morgana"
    const bgColor = "bg-zinc-800"
    const textColor = "text-white"
    const mutedColor = "text-white/70 hover:text-white"

    return (
        <footer id="site-footer" className={cn("w-full pt-16 pb-8", bgColor, textColor)}>
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Column 1: Brand Info */}
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-4 mb-2">
                            {/* Logos Row */}
                            <div className="flex items-center gap-3">
                                {/* Morgana */}
                                <Link href="/morgana" className="relative h-14 w-14 hover:scale-110 transition-transform cursor-pointer">
                                    <Image src="/assets/morgana.png" alt="Morgana logo" fill className="object-contain" sizes="56px" />
                                </Link>
                                {/* Orum */}
                                <Link href="/orum" className="relative h-14 w-14 hover:scale-110 transition-transform cursor-pointer">
                                    <Image src="/assets/orum.png" alt="Orum logo" fill className="object-contain" sizes="56px" />
                                </Link>
                                {/* Azione */}
                                <a href="https://azioneuniversitaria.it" target="_blank" rel="noopener noreferrer" className="relative h-14 w-14 hover:scale-110 transition-transform cursor-pointer">
                                    <Image src="/assets/azione.png" alt="Azione logo" fill className="object-contain" sizes="56px" />
                                </a>
                            </div>
                        </div>
                        <p className="text-sm text-balance opacity-80 leading-relaxed font-bold mt-2">
                            Sempre dalla parte dello studente! <br />
                            Impegno, passione e competenza al servizio della comunità accademica.
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                            <Link href="#" className="hover:opacity-80 transition-opacity"><Facebook className="size-5" /></Link>
                            <Link href="#" className="hover:opacity-80 transition-opacity"><Instagram className="size-5" /></Link>
                            <Link href="#" className="hover:opacity-80 transition-opacity"><Twitter className="size-5" /></Link>
                            <Link href="#" className="hover:opacity-80 transition-opacity"><Youtube className="size-5" /></Link>
                        </div>
                    </div>

                    {/* Column 2: Navigazione */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-lg font-bold font-serif uppercase tracking-widest mb-2 border-b border-white/20 pb-2 w-fit">
                            Navigazione
                        </h3>
                        <ul className="flex flex-col gap-2 text-sm">
                            <li><Link href={`/${brand}`} className={cn("transition-colors", mutedColor)}>Home</Link></li>
                            <li><Link href={`/${brand}/about`} className={cn("transition-colors", mutedColor)}>Chi Siamo</Link></li>
                            <li><Link href={`/${brand}/news`} className={cn("transition-colors", mutedColor)}>Notizie</Link></li>
                            <li><Link href={`/${brand}/events`} className={cn("transition-colors", mutedColor)}>Eventi</Link></li>
                            <li><Link href={`/${brand}/representatives`} className={cn("transition-colors", mutedColor)}>Rappresentanti</Link></li>
                            <li><Link href={`/${brand}/login`} className={cn("transition-colors font-bold", mutedColor)}>Area Riservata</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Link Utili / Legali */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-lg font-bold font-serif uppercase tracking-widest mb-2 border-b border-white/20 pb-2 w-fit">
                            Link Utili
                        </h3>
                        <ul className="flex flex-col gap-2 text-sm">
                            <li><Link href="#" className={cn("transition-colors", mutedColor)}>Statuto Associazione</Link></li>
                            <li><Link href="#" className={cn("transition-colors", mutedColor)}>Iscriviti</Link></li>
                            <li><Link href="#" className={cn("transition-colors", mutedColor)}>Privacy Policy</Link></li>
                            <li><Link href="#" className={cn("transition-colors", mutedColor)}>Cookie Policy</Link></li>
                            <li><Link href="#" className={cn("transition-colors", mutedColor)}>Contatti Stampa</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Contatti */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-lg font-bold font-serif uppercase tracking-widest mb-2 border-b border-white/20 pb-2 w-fit">
                            Contatti
                        </h3>
                        <div className="flex flex-col gap-3 text-sm opacity-80">
                            <div className="flex items-start gap-3">
                                <MapPin className="size-4 mt-1 shrink-0" />
                                <span>
                                    Via Sant&apos;Elia, 11<br />
                                    98122 Messina (ME)
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="size-4 shrink-0" />
                                <a href={`mailto:${isMorgana ? 'associazionemorgana@gmail.com' : 'orum_unime@gmail.com'}`} className="hover:underline">
                                    {isMorgana ? 'associazionemorgana@gmail.com' : 'orum_unime@gmail.com'}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs opacity-60">
                    <p>© {new Date().getFullYear()} Associazione {brand.charAt(0).toUpperCase() + brand.slice(1)}. Tutti i diritti riservati.</p>
                    <p>Designed by Massimo Mantineo</p>
                </div>
            </div>
        </footer>
    )
}