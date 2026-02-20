type BrandConfig = {
    name: string
    color: string
    logo: string
}

const BRANDS: Record<string, BrandConfig> = {
    morgana: {
        name: "Associazione Morgana",
        color: "#ef4444", // red-500
        logo: "https://associazionemorgana.vercel.app/assets/morgana.png"
    },
    orum: {
        name: "Associazione O.R.U.M.",
        color: "#3b82f6", // blue-500
        logo: "https://associazionemorgana.vercel.app/assets/orum.png"
    }
}

export function getWelcomeEmailTemplate(userName: string, brand: string = "morgana") {
    const config = BRANDS[brand] || BRANDS.morgana

    return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 12px; overflow: hidden;">
        <div style="background-color: ${config.color}; padding: 30px; text-align: center;">
            <img src="${config.logo}" alt="${config.name}" style="height: 80px; width: auto;" />
            <h1 style="color: white; margin-top: 20px;">Benvenuto in ${config.name}!</h1>
        </div>
        <div style="padding: 30px; line-height: 1.6; color: #333;">
            <p>Ciao <strong>${userName}</strong>,</p>
            <p>Siamo felici di averti tra noi. La tua registrazione alla piattaforma è avvenuta con successo.</p>
            <p>Ora puoi accedere alla tua area personale per:</p>
            <ul>
                <li>Gestire i tuoi crediti formativi (CFU)</li>
                <li>Scoprire le convenzioni esclusive</li>
                <li>Prenotarti ai prossimi eventi</li>
            </ul>
            <div style="text-align: center; margin: 30px 0;">
                <a href="https://associazionemorgana.vercel.app/${brand}/login" 
                   style="background-color: #18181b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                   Accedi alla Dashboard
                </a>
            </div>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
            <p style="font-size: 12px; color: #888; text-align: center;">
                Sempre dalla parte dello studente.<br />
                © ${new Date().getFullYear()} ${config.name}
            </p>
        </div>
    </div>
    `
}

export function getEventBookingTemplate(userName: string, eventTitle: string, eventDate: string, eventLocation: string, brand: string = "morgana") {
    const config = BRANDS[brand] || BRANDS.morgana

    return `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #18181b; padding: 30px; text-align: center;">
            <img src="${config.logo}" alt="${config.name}" style="height: 60px; width: auto;" />
            <h1 style="color: white; margin-top: 20px;">Prenotazione Confermata!</h1>
        </div>
        <div style="padding: 30px; line-height: 1.6; color: #333;">
            <p>Ciao <strong>${userName}</strong>,</p>
            <p>La tua prenotazione per l'evento è stata registrata correttamente.</p>
            
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e5e7eb;">
                <h3 style="margin-top: 0; color: #111;">${eventTitle}</h3>
                <p style="margin-bottom: 5px;">📅 <strong>Data:</strong> ${eventDate}</p>
                <p style="margin: 0;">📍 <strong>Luogo:</strong> ${eventLocation}</p>
            </div>

            <p>Ti ricordiamo che potrai consultare i dettagli della tua prenotazione e scaricare eventuali allegati direttamente dalla tua dashboard.</p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="https://associazionemorgana.vercel.app/${brand}/dashboard/events" 
                   style="background-color: ${config.color}; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                   I Miei Eventi
                </a>
            </div>

            <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
            <p style="font-size: 12px; color: #888; text-align: center;">
                Non mancare! Se dovessi avere problemi a partecipare, per favore cancella la prenotazione dalla dashboard per liberare il posto.<br />
                © ${new Date().getFullYear()} ${config.name}
            </p>
        </div>
    </div>
    `
}
