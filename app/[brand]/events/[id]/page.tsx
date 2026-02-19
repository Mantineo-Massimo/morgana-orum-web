import { getEventById } from "@/app/actions/events"
import { notFound } from "next/navigation"
import { cookies } from "next/headers"
import EventDetailClient from "./event-detail-client"

export default async function EventDetailPage({ params }: { params: { brand: string, id: string } }) {
    const sessionEmail = cookies().get("session_email")?.value || null
    const event = await getEventById(Number(params.id), sessionEmail)

    if (!event) {
        notFound()
    }

    return (
        <EventDetailClient event={event} brand={params.brand} isLoggedIn={!!sessionEmail} userEmail={sessionEmail} />
    )
}
