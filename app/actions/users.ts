"use server"

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function getUserDashboardData(email?: string) {
    try {
        let userEmail = email

        // If no email provided, try getting from cookie
        if (!userEmail) {
            const { cookies } = await import("next/headers")
            userEmail = cookies().get("session_email")?.value
        }

        if (!userEmail) return null

        const user = await prisma.user.findUnique({
            where: { email: userEmail },
            include: {
                registrations: {
                    include: {
                        event: true
                    }
                }
            }
        })

        if (!user) return null

        // Transform for frontend
        const events = user.registrations.map(reg => ({
            id: reg.event.id,
            title: reg.event.title,
            date: reg.event.date.toLocaleDateString('it-IT', { day: 'numeric', month: 'short', year: 'numeric' }),
            status: reg.status === "REGISTERED" ? "In attesa" :
                reg.status === "ATTENDED" ? "Partecipato" : "CFU Convalidati",
            points: reg.event.cfuValue
        }))

        return {
            user: {
                name: user.name,
                surname: user.surname,
                matricola: user.matricola,
                association: user.association,
                qrToken: user.qrToken,
                role: user.role
            },
            events
        }

    } catch (error) {
        console.error("Error fetching dashboard data:", error)
        return null
    }
}
