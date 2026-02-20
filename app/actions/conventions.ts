"use server"

import prisma from "@/lib/prisma"

export async function getConventions(location?: string) {
    try {
        const conventions = await prisma.convention.findMany({
            where: location ? { location } : {},
            orderBy: { name: 'asc' }
        })
        return conventions
    } catch (error) {
        console.error("Error fetching conventions:", error)
        return []
    }
}
