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

    // --- LOGICA DI INDIRIZZAMENTO ---

    // 1. Se l'utente arriva dal dominio di Morgana
    if (hostname.includes(morganaDomain)) {
        // Riscrive invisibilmente la richiesta verso la cartella /morgana
        return NextResponse.rewrite(new URL(`/morgana${url.pathname}${url.search}`, request.url));
    }

    // 2. Se l'utente arriva dal dominio di Orum
    if (hostname.includes(orumDomain)) {
        // Riscrive invisibilmente la richiesta verso la cartella /orum
        return NextResponse.rewrite(new URL(`/orum${url.pathname}${url.search}`, request.url));
    }

    // 3. Per lo sviluppo in locale sul tuo computer (localhost:3000)
    if (hostname.includes('localhost')) {
        // Quando sviluppi, puoi forzare uno dei due temi per testarlo. 
        // Cambia '/morgana' con '/orum' a seconda di quale vuoi visualizzare sul tuo pc.
        return NextResponse.rewrite(new URL(`/orum${url.pathname}${url.search}`, request.url));
    }

    // Fallback: se non c'è match, procedi normalmente
    return NextResponse.next();
}