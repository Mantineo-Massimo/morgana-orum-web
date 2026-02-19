import type { Metadata, ResolvingMetadata } from 'next'
import { BrandProvider } from "@/components/brand-provider"
import { notFound } from "next/navigation"
import { headers, cookies } from "next/headers"
import { TopBar } from "@/components/top-bar"
import { StickyHeader } from "@/components/sticky-header"
import { Footer } from "@/components/footer"

type Props = {
    params: { brand: string }
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const brand = params.brand

    return {
        title: `${brand.charAt(0).toUpperCase() + brand.slice(1)} - Associazione Universitaria`,
        icons: {
            icon: [
                { url: `/assets/${brand}/favicon.ico` },
                { url: `/assets/${brand}/favicon-16x16.png`, sizes: '16x16', type: 'image/png' },
                { url: `/assets/${brand}/favicon-32x32.png`, sizes: '32x32', type: 'image/png' },
            ],
            shortcut: [`/assets/${brand}/favicon.ico`],
            apple: [
                { url: `/assets/${brand}/apple-touch-icon.png` },
            ],
        }
    }
}

export default function BrandLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: { brand: string }
}) {
    const validBrands = ["morgana", "orum"]
    const isValid = validBrands.includes(params.brand)
    const uiBrand = isValid ? params.brand : "orum"

    const sessionEmail = cookies().get("session_email")?.value
    const isLoggedIn = !!sessionEmail

    return (
        <BrandProvider defaultBrand={isValid ? params.brand as "morgana" | "orum" : null}>
            <div className="flex min-h-screen flex-col bg-background font-sans">

                <TopBar brand={uiBrand} />
                <StickyHeader brand={uiBrand} isLoggedIn={isLoggedIn} />

                <main className="flex-1">
                    {isValid ? children : (
                        <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center py-20">
                            <h1 className="text-9xl font-black text-zinc-100">404</h1>
                            <div className="space-y-4 -mt-12 relative z-10">
                                <h2 className="text-3xl font-bold text-zinc-900">Pagina non trovata</h2>
                                <p className="text-zinc-500 max-w-md mx-auto">
                                    La sezione <strong>{params.brand}</strong> non esiste o non è disponibile.
                                </p>
                                <a
                                    href="/"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white rounded-xl hover:bg-black transition-all active:scale-95 font-medium"
                                >
                                    Torna alla Home
                                </a>
                            </div>
                        </div>
                    )}
                </main>

                <Footer brand={uiBrand} />
            </div>
        </BrandProvider>
    )
}
