"use server"

import prisma from "@/lib/prisma"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { sendEmail } from "@/lib/mail"
import { getWelcomeEmailTemplate } from "@/lib/email-templates"


export async function loginAction(email: string) {
    // SIMPLIFIED AUTH for demo purposes
    // In production: Verify password, set HTTP-only cookie session
    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (user) {
        // Set session cookie
        cookies().set("session_email", email, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
        })
        return { success: true, user }
    }
    return { success: false, error: "Utente non trovato" }
}

export async function logoutAction(brand: string) {
    cookies().delete("session_email")
    redirect(`/${brand}`)
}

export async function registerUser(formData: FormData) {
    const name = formData.get("name") as string
    const surname = formData.get("surname") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const birthDateStr = formData.get("birthDate") as string
    const matricola = formData.get("matricola") as string
    const department = formData.get("department") as string
    const degreeCourse = formData.get("degreeCourse") as string
    const isFuorisede = formData.get("isFuorisede") === "yes"
    const association = formData.get("association") as string || "Insieme" // Default if missing

    // Validazione base
    if (!name || !surname || !email || !password || !birthDateStr || !matricola || !department || !degreeCourse) {
        return { success: false, error: "Tutti i campi sono obbligatori." }
    }

    try {
        const user = await prisma.user.create({
            data: {
                name,
                surname,
                birthDate: new Date(birthDateStr),
                email,
                password, // In real app: hash this!
                matricola,
                department,
                degreeCourse,
                isFuorisede,
                association,
                role: "USER"
            }
        })

        // Set session cookie
        cookies().set("session_email", email, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
        })

        // Send Welcome Email (Non-blocking)
        const brand = (association?.toLowerCase() === "orum" || association?.toLowerCase() === "o.r.u.m.") ? "orum" : "morgana"
        sendEmail({
            to: email,
            subject: `Benvenuto in ${brand === "orum" ? "O.R.U.M." : "Morgana"}!`,
            html: getWelcomeEmailTemplate(name, brand as "morgana" | "orum"),
            brand: brand as "morgana" | "orum"
        }).catch(err => console.error("Async welcome email error:", err))

        return { success: true, user }
    } catch (error) {
        console.error("Registration error:", error)
        return { success: false, error: "Errore durante la registrazione. Matricola o Email già in uso?" }
    }
}
