"use client"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col md:flex-row font-serif">
      {/* Morgana Side - THEME: CIRCLE */}
      <Link
        href="/morgana"
        className="group relative flex flex-1 items-center justify-center bg-[#c12830] transition-all duration-500 hover:flex-[1.2] border-r-4 border-white z-10"
      >
        <div className="absolute inset-0 bg-[url('/assets/pattern.svg')] opacity-20 mix-blend-multiply"></div>
        <div className="z-10 text-center text-white p-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Logo Image */}
            <div className="mx-auto mb-8 size-48 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-300 relative overflow-hidden p-4">
              <Image
                src="/assets/morgana.png"
                alt="Morgana Logo"
                fill
                className="object-contain p-4"
                priority
                sizes="(max-width: 768px) 100vw, 192px"
              />
            </div>

            <h1 className="text-6xl font-black uppercase tracking-tight mb-4">Morgana</h1>
            <div className="h-1 w-24 bg-white mx-auto mb-6"></div>
            <p className="max-w-md mx-auto text-white/90 text-xl italic font-serif mb-10">
              &quot;Tradizione e Identità&quot;
            </p>

            <div className="inline-block border-2 border-white px-8 py-3 uppercase tracking-widest font-bold text-sm hover:bg-white hover:text-[#c12830] transition-colors">
              Vai al Portale
            </div>
          </motion.div>
        </div>
      </Link>

      {/* Orum Side - THEME: RHOMBUS */}
      <Link
        href="/orum"
        className="group relative flex flex-1 items-center justify-center bg-[#18182e] transition-all duration-500 hover:flex-[1.2] z-10"
      >
        <div className="absolute inset-0 bg-[url('/assets/pattern.svg')] opacity-10 mix-blend-screen"></div>
        <div className="z-10 text-center text-white p-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Logo Image */}
            <div className="mx-auto mb-12 size-36 bg-white rotate-45 flex items-center justify-center shadow-2xl group-hover:rotate-[225deg] transition-transform duration-700 relative overflow-hidden">
              <div className="-rotate-45 h-full w-full relative">
                <Image
                  src="/assets/orum.png"
                  alt="Orum Logo"
                  fill
                  className="object-contain p-2"
                  priority
                  sizes="(max-width: 768px) 100vw, 144px"
                />
              </div>
            </div>

            <h1 className="text-6xl font-black uppercase tracking-tight mb-4">Orum</h1>
            <div className="h-1 w-24 bg-white mx-auto mb-6"></div>
            <p className="max-w-md mx-auto text-white/90 text-xl italic font-serif mb-10">
              &quot;Innovazione e Futuro&quot;
            </p>

            <div className="inline-block border-2 border-white px-8 py-3 uppercase tracking-widest font-bold text-sm hover:bg-white hover:text-[#18182e] transition-colors">
              Vai al Portale
            </div>
          </motion.div>
        </div>
      </Link>
    </main>
  )
}

