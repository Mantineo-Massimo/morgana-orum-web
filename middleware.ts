import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Ottieni l'URL richiesto e il dominio (hostname)
    const url = request.nextUrl;
    const hostname = request.headers.get('host') || '';

    // Definisci i tuoi domini (sostituiscili con quelli reali quando li avrai)
    const morganaDomain = 'associazionemorgana.it';
    const orumDomain = 'associazioneorum.it';

    // Salta l'intercettazione per i file di sistema, immagini e API
    // Questo è fondamentale per non rompere il caricamento del sito
    if (
        url.pathname.startsWith('/_next') ||
        url.pathname.startsWith('/api') ||
        url.pathname.includes('.')
    ) {
        return NextResponse.next();
    }

    // Se l'utente visita la root principale senza specificare il brand (es: sito.com/)
    // Reindirizziamo in base al nome del dominio/sottodominio
    if (url.pathname === '/') {
        if (hostname.includes('morgana')) {
            return NextResponse.redirect(new URL('/morgana', request.url));
        }
        return NextResponse.redirect(new URL('/orum', request.url));
    }

    // Per tutte le altre route (es: /morgana/events, /orum/login, ecc...) procedi normalmente
    // Sarà poi Vercel a poter essere configurato per collegare i domini reali a specifici path!
    return NextResponse.next();
}